import React from "react";
import Seo from "./Seo";
import { frontendBaseUrl } from "@/constants/variables";
import { Toaster } from "react-hot-toast";

const Layout: React.FC<any> = ({ children }) => {
	return (
		<>
			<Seo
				title="GenShell - Your AI powered shell companion"
				description="Unleash the power of AI in your own shell and master the CLI like never before."
				image={`${frontendBaseUrl}/og-image.png`}
				canonical={frontendBaseUrl}
				themeColor="#0C1015"
				icons={["icon", "shortcut icon", "apple-touch-icon"].map(
					(item) => {
						return {
							rel: item,
							href: "/favicon.ico",
							type: "icon/ico",
						};
					}
				)}
				twitter={{
					card: "summary_large_image",
					site: "@akshatmittal61",
					author: "@akshatmittal61",
					title: "GenShell - Your AI powered shell companion",
					description:
						"Unleash the power of AI in your own shell and master the CLI like never before.",
					image: `${frontendBaseUrl}/og-image.png`,
					url: frontendBaseUrl,
				}}
				og={{
					title: "GenShell - Your AI powered shell companion",
					description:
						"Unleash the power of AI in your own shell and master the CLI like never before.",
					images: [
						{
							url: "/images/og-image.png",
							secureUrl: `${frontendBaseUrl}/og-image.png`,
							type: "image/png",
							width: 1200,
							height: 630,
							alt: "GenShell - Your AI powered shell companion",
						},
						{
							url: `${frontendBaseUrl}/favicon-192.png`,
							secureUrl: `${frontendBaseUrl}/favicon-192.png`,
							type: "image/png",
							width: 192,
							height: 192,
							alt: "GenShell - Your AI powered shell companion",
						},
						{
							url: `${frontendBaseUrl}/favicon-512.png`,
							secureUrl: `${frontendBaseUrl}/favicon-512.png`,
							type: "image/png",
							width: 512,
							height: 512,
							alt: "GenShell - Your AI powered shell companion",
						},
					],
					url: frontendBaseUrl,
					type: "website",
					siteName: "GenShell - Your AI powered shell companion",
				}}
			/>
			{children}
			<Toaster position="top-center" reverseOrder={false} />
		</>
	);
};

export default Layout;
