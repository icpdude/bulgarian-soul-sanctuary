# WalletConnect Setup Guide

This application uses RainbowKit with WalletConnect for Web3 wallet integration.

## Getting a WalletConnect Project ID

1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up or log in to your account
3. Create a new project
4. Copy your Project ID
5. Add it to your `.env` file:

```bash
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

## Features

- **Multi-Wallet Support**: MetaMask, WalletConnect, Coinbase Wallet, and more
- **Multi-Chain Support**: Ethereum, Polygon, Optimism, Arbitrum, Base, and Sepolia testnet
- **Automatic Connection**: Persists wallet connection across sessions
- **Theme Integration**: Custom themed to match your app design
- **Analytics**: Tracks wallet connections automatically

## Configuration

The wagmi configuration is in `src/config/wagmi.ts`. You can customize:

- **Chains**: Add or remove blockchain networks
- **App Name**: Customize the app name shown in wallet prompts
- **Theme**: Adjust RainbowKit theme colors in `src/main.tsx`

## Usage

The WalletConnect component in `src/components/atomic/WalletConnect.tsx` provides a custom UI for the RainbowKit ConnectButton with:

- Responsive design (shows "Connect" on mobile, "Connect Wallet" on desktop)
- Network switching
- Account management
- Wrong network detection
- Framer Motion animations

## Testing

For development and testing, you can use:
- **Sepolia testnet** (included in config)
- **MetaMask** or any Web3 wallet
- Get test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)

## Troubleshooting

If wallet connection isn't working:

1. Make sure you have a valid WalletConnect Project ID
2. Check that your environment variable is prefixed with `VITE_`
3. Restart your development server after adding the `.env` file
4. Clear browser cache and wallet connection history
5. Make sure your wallet is connected to a supported network

## Documentation

- [RainbowKit Docs](https://www.rainbowkit.com/docs/introduction)
- [Wagmi Docs](https://wagmi.sh/)
- [WalletConnect Docs](https://docs.walletconnect.com/)
