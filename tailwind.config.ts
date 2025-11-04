import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Manrope', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
				display: ['Playfair Display', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Spirit of Bulgaria cultural colors
				rose: {
					DEFAULT: 'hsl(var(--rose))',
					foreground: 'hsl(var(--rose-foreground))'
				},
				amber: {
					DEFAULT: 'hsl(var(--amber))',
					foreground: 'hsl(var(--amber-foreground))'
				},
				navy: {
					DEFAULT: 'hsl(var(--navy))',
					foreground: 'hsl(var(--navy-foreground))'
				}
			},
			backgroundImage: {
				'gradient-dawn': 'var(--gradient-dawn)',
				'gradient-dusk': 'var(--gradient-dusk)',
				'gradient-mystical': 'var(--gradient-mystical)',
				'gradient-aurora': 'var(--gradient-aurora)',
				'gradient-heritage': 'var(--gradient-heritage)',
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'warm': 'var(--shadow-warm)',
				'elevated': 'var(--shadow-elevated)',
				'deep': 'var(--shadow-deep)',
				'ambient': 'var(--shadow-ambient)',
			},
			transitionTimingFunction: {
				'spiritual': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'elegant': 'cubic-bezier(0.22, 1, 0.36, 1)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'25%': { transform: 'translateY(-12px) rotate(1.5deg)' },
					'50%': { transform: 'translateY(-6px) rotate(-0.5deg)' },
					'75%': { transform: 'translateY(-8px) rotate(0.8deg)' }
				},
				'glow': {
					'0%': { boxShadow: '0 0 20px hsl(var(--primary-glow) / 0.2)' },
					'100%': { boxShadow: '0 0 40px hsl(var(--primary-glow) / 0.6)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
					'50%': { transform: 'scale(1.05)', opacity: '1' }
				},
				'aurora-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'float': 'float 7s ease-in-out infinite',
				'glow': 'glow 5s ease-in-out infinite alternate',
				'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
				'drift': 'drift 25s ease-in-out infinite',
				'shimmer': 'shimmer 3s ease-in-out infinite',
				'breathe': 'breathe 6s ease-in-out infinite',
				'aurora': 'aurora-shift 15s ease infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
