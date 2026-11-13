// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts@5.4.0/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts@5.4.0/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts@5.4.0/token/ERC20/utils/SafeERC20.sol";

/// @notice Classroom demo token. No monetary value.
contract CADToken is ERC20 {
    constructor() ERC20("Consent Ad Demo Token", "CAD") {
        _mint(msg.sender, 10_000);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}

/// @notice One advertisement per escrow. Configure terms at deployment.
/// Terms are immutable after deployment: an approval cannot be reused for new terms.
contract ConsentAdEscrow {
    using SafeERC20 for IERC20;

    IERC20 public immutable cad;
    address public immutable advertiser;
    address public immutable rightsHolder;
    address public immutable platform;

    // Set for each advertisement in the constructor.
    // Getter names are preserved for compatibility with the existing website.
    uint256 public immutable RIGHTS_FEE;
    uint256 public immutable PLATFORM_FEE;
    uint256 public immutable TOTAL_FEE;
    uint256 public immutable EXECUTION_WINDOW;
    uint256 public immutable USAGE_PERIOD;

    enum Status {
        NotRegistered, // 0
        Registered,    // 1
        Funded,        // 2
        Approved,      // 3
        Active,        // 4
        Rejected,      // 5
        Refunded       // 6
    }

    Status public status;
    bytes32 public videoHash;
    uint256 public executionDeadline;
    uint256 public usageEnd;

    event TermsConfigured(
        uint256 rightsFee,
        uint256 platformFee,
        uint256 executionWindowSeconds,
        uint256 usagePeriodSeconds
    );
    event AdRegistered(bytes32 indexed videoHash, uint256 executionDeadline);
    event EscrowFunded(address indexed advertiser, uint256 amount);
    event UseApproved(address indexed rightsHolder);
    event UseRejected(address indexed rightsHolder);
    event AdActivated(bytes32 indexed videoHash, uint256 usageEnd);
    event EscrowRefunded(address indexed advertiser, uint256 amount);

    modifier onlyAdvertiser() {
        require(msg.sender == advertiser, "Only advertiser");
        _;
    }

    modifier onlyRightsHolder() {
        require(msg.sender == rightsHolder, "Only rights holder");
        _;
    }

    modifier onlyPlatform() {
        require(msg.sender == platform, "Only platform");
        _;
    }

    /// @param rightsFee Integer CAD paid to the rights holder.
    /// @param platformFee Integer CAD paid to the platform.
    /// @param executionWindowSeconds Time allowed after registerAd, in seconds.
    /// @param usagePeriodSeconds Time allowed after activateAd, in seconds.
    constructor(
        address tokenAddress,
        address rightsHolderAddress,
        address platformAddress,
        uint256 rightsFee,
        uint256 platformFee,
        uint256 executionWindowSeconds,
        uint256 usagePeriodSeconds
    ) {
        require(tokenAddress.code.length > 0, "Invalid token contract");
        require(rightsHolderAddress != address(0), "Invalid rights holder");
        require(platformAddress != address(0), "Invalid platform");
        require(rightsHolderAddress != platformAddress, "Different roles required");
        require(rightsHolderAddress != msg.sender, "Advertiser cannot approve");
        require(platformAddress != msg.sender, "Advertiser cannot activate");
        require(rightsFee + platformFee > 0, "Total fee must be positive");
        require(executionWindowSeconds > 0, "Invalid execution window");
        require(usagePeriodSeconds > 0, "Invalid usage period");
        require(
            executionWindowSeconds <= type(uint64).max &&
            usagePeriodSeconds <= type(uint64).max,
            "Duration too large"
        );

        cad = IERC20(tokenAddress);
        advertiser = msg.sender;
        rightsHolder = rightsHolderAddress;
        platform = platformAddress;
        RIGHTS_FEE = rightsFee;
        PLATFORM_FEE = platformFee;
        TOTAL_FEE = rightsFee + platformFee;
        EXECUTION_WINDOW = executionWindowSeconds;
        USAGE_PERIOD = usagePeriodSeconds;

        emit TermsConfigured(rightsFee, platformFee, executionWindowSeconds, usagePeriodSeconds);
    }

    function registerAd(bytes32 finalVideoHash) external onlyAdvertiser {
        require(status == Status.NotRegistered, "Already registered");
        require(finalVideoHash != bytes32(0), "Empty video hash");
        videoHash = finalVideoHash;
        executionDeadline = block.timestamp + EXECUTION_WINDOW;
        status = Status.Registered;
        emit AdRegistered(finalVideoHash, executionDeadline);
    }

    function deposit() external onlyAdvertiser {
        require(status == Status.Registered, "Register first");
        require(block.timestamp <= executionDeadline, "Deadline passed");
        status = Status.Funded;
        cad.safeTransferFrom(advertiser, address(this), TOTAL_FEE);
        emit EscrowFunded(advertiser, TOTAL_FEE);
    }

    function approveUse() external onlyRightsHolder {
        require(status == Status.Funded, "Deposit first");
        require(block.timestamp <= executionDeadline, "Deadline passed");
        status = Status.Approved;
        emit UseApproved(msg.sender);
    }

    function rejectUse() external onlyRightsHolder {
        require(status == Status.Funded || status == Status.Approved, "Cannot reject now");
        status = Status.Rejected;
        emit UseRejected(msg.sender);
    }

    function activateAd(bytes32 actualVideoHash) external onlyPlatform {
        require(status == Status.Approved, "Not approved");
        require(block.timestamp <= executionDeadline, "Deadline passed");
        require(actualVideoHash == videoHash, "Video hash mismatch");
        status = Status.Active;
        usageEnd = block.timestamp + USAGE_PERIOD;
        if (RIGHTS_FEE > 0) cad.safeTransfer(rightsHolder, RIGHTS_FEE);
        if (PLATFORM_FEE > 0) cad.safeTransfer(platform, PLATFORM_FEE);
        emit AdActivated(videoHash, usageEnd);
    }

    function refund() external onlyAdvertiser {
        require(
            status == Status.Funded || status == Status.Approved || status == Status.Rejected,
            "No refundable escrow"
        );
        require(status == Status.Rejected || block.timestamp > executionDeadline, "Still pending");
        status = Status.Refunded;
        cad.safeTransfer(advertiser, TOTAL_FEE);
        emit EscrowRefunded(advertiser, TOTAL_FEE);
    }

    function isPublishable(bytes32 actualVideoHash) external view returns (bool) {
        return status == Status.Active && block.timestamp <= usageEnd && actualVideoHash == videoHash;
    }

    function escrowBalance() external view returns (uint256) {
        return cad.balanceOf(address(this));
    }
}
