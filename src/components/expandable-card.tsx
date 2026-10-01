"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/data/projects";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface ExpandableCardsProps {
  projects: Project[];
}

export function ExpandableCards({ projects }: ExpandableCardsProps) {
  const [active, setActive] = useState<Project | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              key={`button-${active.id}-${id}`}
              type="button"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              onClick={() => setActive(null)}
              aria-label="프로젝트 닫기"
              className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 text-zinc-300 lg:hidden"
            >
              <X className="size-4" />
            </motion.button>

            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`title-${active.id}-${id}`}
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-zinc-900 sm:rounded-3xl sm:border sm:border-zinc-800 md:h-fit md:max-h-[90%]"
            >
              <motion.div
                layoutId={`image-${active.id}-${id}`}
                className="relative aspect-video w-full shrink-0 overflow-hidden"
              >
                <Image
                  src={active.thumbnail}
                  alt={active.title}
                  fill
                  sizes="500px"
                  quality={90}
                  className="object-cover"
                />
              </motion.div>

              <div className="p-5">
                <motion.h3
                  layoutId={`title-${active.id}-${id}`}
                  id={`title-${active.id}-${id}`}
                  className="text-lg font-medium tracking-tight text-zinc-100"
                >
                  {active.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${active.id}-${id}`}
                  className="mt-1 font-pretendard text-sm text-zinc-400"
                >
                  {active.category} · {active.year}
                </motion.p>
              </div>

              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-0 flex-1 overflow-auto px-5 pb-10 [mask-image:linear-gradient(to_bottom,black_80%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <p className="break-keep font-pretendard text-sm leading-relaxed text-zinc-400">
                  {active.summary}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  {active.images.map((src, index) => (
                    <div
                      key={src}
                      className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
                    >
                      <Image
                        src={src}
                        alt={`${active.title} 작업물 ${index + 1}`}
                        fill
                        sizes="460px"
                        quality={90}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="grid w-full grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.id}>
            <motion.button
              type="button"
              layoutId={`card-${project.id}-${id}`}
              onClick={() => setActive(project)}
              className="flex w-full cursor-pointer flex-col gap-4 rounded-[20px] border border-zinc-800/80 bg-zinc-900/30 p-3 text-left transition-colors hover:border-zinc-700 hover:bg-zinc-900/60"
            >
              <motion.div
                layoutId={`image-${project.id}-${id}`}
                className="relative aspect-video w-full overflow-hidden rounded-xl"
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  className="object-cover"
                />
              </motion.div>
              <div className="px-1 pb-1">
                <motion.h3
                  layoutId={`title-${project.id}-${id}`}
                  className="text-base font-medium tracking-tight text-zinc-100"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${project.id}-${id}`}
                  className="mt-1 font-pretendard text-sm text-zinc-400"
                >
                  {project.category} · {project.year}
                </motion.p>
              </div>
            </motion.button>
          </li>
        ))}
      </ul>
    </>
  );
}
