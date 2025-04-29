import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { GlareCard } from "./ui/glare-card";
import { v4 } from "uuid";

import { FaCircleCheck } from "react-icons/fa6";

interface planeData {
  name: string;
  description: string;
  price: number;
  features: string[];
}

export default function Pricing() {
  const data: planeData[] = [
    {
      name: "Basic",
      description: "For small teams",
      price: 0,
      features: ["Unlimited users", "Unlimited projects", "Unlimited storage"],
    },
    {
      name: "Pro",
      description: "For medium teams",
      price: 10,
      features: ["Unlimited users", "Unlimited projects", "Unlimited storage"],
    },
    {
      name: "Enterprise",
      description: "For large teams",
      price: 20,
      features: ["Unlimited users", "Unlimited projects", "Unlimited storage"],
    },
  ];

  return (
    <div className="pricing px-10">
      <div className="title text-4xl md:text-6xl font-bold text-center leading-[4rem]">
        Choose Your{" "}
        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          Plan
        </span>
      </div>
      <div className="plans flex flex-wrap [&>*]:flex-1 gap-10 mt-20">
        {data.map((plane) => (
          <div className="plane bg-gradient-to-b from-indigo-950 to-indigo-black rounded-lg" key={v4()}>
            <Card className="bg-transparent border-none shadow-none py-4 px-10">
              <CardHeader className="bg-none flex-col gap-2">
                <div className="plane-name text-3xl font-semibold">
                  {plane.name}
                </div>
                <div className="description text-sm text-gray-500">
                  {plane.description}
                </div>
              </CardHeader>
              <CardBody className="items-center">
                <div className="price flex items-center justify-center gap-1">
                  <span className="text-xl text-gray-500">$</span>
                  <span className="text-7xl">-</span>
                  {/* <span className="text-7xl">{plane.price}</span> */}
                  <span className="text-gray-500">USD/month</span>
                </div>
                <div className="features mt-4 border-1  w-full rounded p-3">
                  <div className="title text-sm tracking-wider mb-2">
                    INCLUDE
                  </div>
                  {plane.features.map((feature) => (
                    <div
                      key={v4()}
                      className="feature font-light text-sm mb-1 flex items-center gap-2"
                    >
                      <span className="icon text-medium">
                        <FaCircleCheck />
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
              <CardFooter className=" justify-center">
                <Button variant="ghost">
                  CHOSE THIS
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
