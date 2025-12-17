import { useState, useEffect, useRef } from 'react';

export function useSectionVisibility() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (!sectionId) return;

          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(sectionId));
          }
        });
      },
      { threshold: 0.3 },
    );

    sectionRefs.current.forEach(element => {
      observer.observe(element);
    });

    return () => {
      sectionRefs.current.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  const setSectionRef = (id: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(id, element);
    } else {
      sectionRefs.current.delete(id);
    }
  };

  return { visibleSections, setSectionRef };
}
