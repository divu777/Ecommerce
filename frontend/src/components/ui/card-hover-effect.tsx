import { cn } from "../../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HoverEffectProps {
  items: {
    title: string;
    description: string;
    imageSource: string;
    link?: string; // Add link property
  }[];
  className?: string; // Add className as an optional prop
}

export const HoverEffect = ({ items, className }: HoverEffectProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          to="/"
          key={item.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full dark:bg-slate-800/[0.8] block rounded-3xl"
                style={{ background: "#ababab" }}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle imageSource={item.imageSource}>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 shadow-xl",
        className
      )}
    >
      <div className="relative z-50">{children}</div>
    </div>
  );
};

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
  imageSource: string;
}

export const CardTitle = ({
  className,
  children,
  imageSource,
}: CardTitleProps) => {
  return (
    <div className="flex items-center ">
      <h4
        className={cn(
          "text-black font-bold tracking-wide mt-4 px-2",
          className
        )}
      >
        {children}
      </h4>
      <img
        src={imageSource}
        alt="Card Image"
        className="w-20 h-20 absolute left-3/4 mt-4"
      />
    </div>
  );
};

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export const CardDescription = ({
  className,
  children,
}: CardDescriptionProps) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-700 tracking-wide leading-relaxed text-md",
        className
      )}
    >
      {children}
    </p>
  );
};
