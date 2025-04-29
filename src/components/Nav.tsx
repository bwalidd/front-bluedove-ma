import { motion } from "framer-motion";
import { Button } from "./ui/button";
import bluedoveLogo from "@/assets/bluedove-logo.png";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  // window.addEventListener("scroll", function () {
  //   console.log(window.scrollY);
  // })

  // 0
  // 876
  // 2690
  // 4130


  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  }


  return (
    <motion.nav
      className="fixed flex items-center justify-between p-4 lg:px-8 relative z-10 "
      // initial={{ opacity: 0, y: 100 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 1 }}
    >
      {/* Logo */}
      <div className="">
        <img className="w-40" src={bluedoveLogo} alt="bluedove logo" />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center">
        <motion.div
          className="nav-btn"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Button variant="ghost">
            <div className="text-sm">Home</div>
          </Button>
        </motion.div>
        <motion.div
          className="nav-btn"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.03 }}
        >
          <Button
            variant="ghost"
            onClick={() =>
              window.scrollTo({
                behavior: "smooth",
                top: 1000,
              })
            }
          >
            <div className="text-sm">ZARK Engine</div>
          </Button>
        </motion.div>
        <motion.div
          className="nav-btn"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.06 }}
        >
          <Button
            variant="ghost"
            onClick={() =>
              window.scrollTo({
                behavior: "smooth",
                top: 2600,
              })
            }
          >
            <div className="text-sm">Use cases</div>
          </Button>
        </motion.div>
        <motion.div
          className="nav-btn"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <Button
            variant="ghost"
            onClick={() =>
              window.scrollTo({
                behavior: "smooth",
                top: 3550,
              })
            }
          >
            <div className="text-sm">Industries</div>
          </Button>
        </motion.div>
        <motion.div
          className="nav-btn"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Button
            variant="ghost"
            onClick={() =>
              window.scrollTo({
                behavior: "smooth",
                top: 6800,
              })
            }
          >
            <div className="text-sm">Pricing</div>
          </Button>
        </motion.div>
      </div>

      {/* Right side buttons and language selector */}
      <div className="flex items-center gap-4">
        {/* <Button variant="outline" className="hidden md:inline-flex">
            Se connecter
          </Button> */}

        
          <div
            variant="ghost"
            onClick={() =>
              window.scrollTo({
                behavior: "smooth",
                top: 6800,
              })
            }
          >
             <Button>Buy Now</Button>
          </div>
        {/* </motion.div> */}
        {/* <Button>Buy Now</Button> */}
        <button onClick={navigateToLogin} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-transparent text-white border border-white hover:bg-white hover:text-black h-9 px-4 py-2">
          Login
        </button>
        {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
      </div>
    </motion.nav>
  );
}
