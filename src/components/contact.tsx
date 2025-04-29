import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Contact Form Section */}
                <div className="grid lg:grid-cols-2 gap-12 mb-24">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Need
                            <br />
                            More Information
                            <br />
                            Or a demo ?
                        </h1>
                        <div className="text-5xl font-bold">
                            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                                Contact Us !
                            </span>
                        </div>
                        <div className="mt-8 text-1xl font-bold">
                            <div className="flex items-center gap-2 mb-4">
                                <Phone className="h-5 w-5" />
                                <span>+2126 48 37 77 97</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Input
                            placeholder="Name"
                            className="bg-gray-800 border-gray-700"
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            className="bg-gray-800 border-gray-700"
                        />
                        <Input
                            placeholder="Company Name"
                            className="bg-gray-800 border-gray-700"
                        />
                        <Input
                            placeholder="Phone (optional)"
                            type="tel"
                            className="bg-gray-800 border-gray-700"
                        />
                        <div>
                            <Input
                                type="file"
                                className="bg-gray-800 border-gray-700"
                                accept="image/*,.pdf"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                You can upload a file (up to 20 MB)
                            </p>
                        </div>
                        <Textarea
                            placeholder="Your message"
                            className="bg-gray-800 border-gray-700 min-h-[150px]"
                        />
                        <p className="text-xs text-gray-400">
                            If you need to share a video, please share a URL
                        </p>
                        <Button className="w-full">Send</Button>
                        <p className="text-xs text-gray-400">
                            Never share sensitive information (credit card numbers, social security
                            data, passwords) through this form.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black border-t border-gray-800 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap md:grid grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold mb-4">BLUEDOVE</h3>
                            <p className="text-sm text-gray-400">
                                AI Vision Software
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Ressources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="/"
                                        className="text-sm text-gray-400 hover:text-white"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="text-sm text-gray-400 hover:text-white"
                                    >
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="text-sm text-gray-400 hover:text-white"
                                    >
                                        Jobs
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="text-sm text-gray-400 hover:text-white"
                                    >
                                        Newsletter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="text-sm text-gray-400 hover:text-white"
                                    >
                                        Portail BLUEDOVE
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="/"
                                        className="text-sm text-gray-400 hover:text-white"
                                    >
                                        Legal Notice
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="text-sm text-gray-400 hover:text-white"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="text-sm text-gray-400 hover:text-white"
                                    >
                                        Cookie Settings
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-start gap-4 fill-white">
                            <a
                                href="https://linkedin.com/company/bluedove/posts/?feedView=all"
                                className="text-gray-400 hover:text-white"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            {/* <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a> */}
                            {/* <a
                href="https://youtube.com"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6 bg-white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a> */}
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800">
                        <p className="text-sm text-gray-400">
                            BLUEDOVE © 2015-2025. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
