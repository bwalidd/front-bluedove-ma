"use client";
import React, { useEffect, useRef } from "react";
// import { IconArrowNarrowLeft, IconArrowNarrowRight } from 'react-icons'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Image, ImageProps } from "@nextui-org/react";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: JSX.Element[];
  initialScroll?: number;
}

export const Carousel = ({
  items,
  initialScroll = 0,
  ...props
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className={`relative w-full ${props || ""}`}
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div
          className={cn(
            "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
          )}
        ></div>

        <div
          className={cn(
            "flex flex-row justify-start gap-4 pl-4",
            "max-w-7xl mx-auto"
          )}
        >
          {items.map((item, index) => (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                },
              }}
              key={"card" + index}
              className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 mr-10">
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <FaArrowLeft className="h-6 w-6 text-gray-500" />
        </button>
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <FaArrowRight className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </motion.div>
  );
};

export const Card = ({
  card,
}: {
  card: {
    src: string;
    title: string;
  };
}) => {
  return (
    <motion.div
      className="rounded-3xl h-80 w-56 md:h-[20rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10
        bg-cover bg-center
      "
      whileHover={{ scale: 1.05 }}
    >
      <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
      <div className="relative z-40 p-8 w-full h-full bg-black/70 flex items-end justify-center transition hover:opacity-0">
        <p className="text-white text-xl md:text-3xl font-bold max-w-xs [text-wrap:balance] font-sans mt-2">
          {card.title}
        </p>
      </div>
      <img className="absolute h-full left-1/2 -translate-x-1/2" src={card.src}/>
    </motion.div>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = React.useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
