import { assets } from "../assets/frontend_assets/assets"


const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={assets.logo} alt="" className="mb-5 w-32" />
                    <p className="w-full md:w2/3 text-gray-600">Test</p>
                </div>

                <div> 
                    <p className="text-xl font-medium mb-5">Company</p>
                    <ul className="text-gray-600 flex flex-col gap-1">
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="text-gray-600 flex flex-col gap-1">
                        <li>+555-555-5555</li>
                        <li>uLlYf@example.com</li>
                        <li>Address: 1234 Main St, Anytown USA</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className="py-5 text-sm text-center">COPYRIGHT 2024@ forever.com - ALL RIGHT RESERVED</p>
            </div>
        </div>
    )
}

export default Footer