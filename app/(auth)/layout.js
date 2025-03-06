import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Auth ",
    description: "Generated by create next app",
};

export default async function AuthLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
