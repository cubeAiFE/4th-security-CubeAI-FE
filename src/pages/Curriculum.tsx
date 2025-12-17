import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Cube from '@/assets/Cube.png';

import { stages } from '@/constants/Stages';
import type { Topic, Stage } from '@/constants/Stages';

const TopicSection: React.FC<{ topic: Topic; gradient: string }> = ({ topic, gradient }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6">
      <div
        className={`flex items-center justify-between gap-3 p-4 bg-gradient-to-r ${gradient} text-white rounded-xl cursor-pointer transition-all hover:translate-x-1 shadow-md`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl">{topic.number}.</span>
          <span className="font-semibold text-lg">{topic.title}</span>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {isOpen && (
        <div className="mt-2 p-4 pl-10 bg-gray-50 rounded-b-xl">
          {topic.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 py-2 text-gray-700">
              <span className="text-purple-600 font-bold mt-1">→</span>
              <span className="leading-relaxed">{item.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StageCard: React.FC<{ stage: Stage; stageRef: React.RefObject<HTMLDivElement> }> = ({
  stage,
  stageRef,
}) => {
  return (
    <div
      ref={stageRef}
      className="bg-white rounded-2xl p-8 shadow-2xl transition-all hover:-translate-y-2 hover:shadow-3xl"
    >
      <div className={`flex items-center gap-4 mb-6 pb-4 border-b-4 ${stage.headerColor}`}>
        <span className="text-5xl">{stage.icon}</span>
        <h2 className="text-3xl font-bold text-gray-800">
          {stage.id}단계 - {stage.title}
        </h2>
      </div>

      {stage.topics.map(topic => (
        <TopicSection key={topic.number} topic={topic} gradient={stage.gradient} />
      ))}
    </div>
  );
};

export default function AILearningGuide() {
  const [activeStage, setActiveStage] = useState(1);
  const stageRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const scrollToStage = (stageId: number) => {
    const ref = stageRefs[stageId - 1];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveStage(stageId);
    }
  };

  useEffect(() => {
    const observers = stageRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveStage(index + 1);
            }
          });
        },
        { threshold: 0.5 },
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (stageRefs[index].current) {
          observer.unobserve(stageRefs[index].current!);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen text-zinc-900 bg-white">
      <Header />
      <div className="mx-auto max-w-100% px-6 pb-10 bg-sky-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 items-center">
          <div className="space-y-8">
            <h1 className="text-white text-4xl md:text-4xl font-bold px-[153px] leading-tight">
              큐브 AI, 실무형 인공지능 학습의 시작
            </h1>
            <p className="text-white text-lg md:text-xl font-medium  px-[153px] leading-relaxed">
              AI를 처음 배우는 사람도, 개념부터 실습까지
              <br />한 번에 익히고 바로 활용할 수 있습니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-0 text-white text-3xl font-bold place-items-center relative">
            <div className="h-36 w-full grid place-items-center relative z-10">
              <img src={Cube} alt="AI Basics" className="w-full h-[152px] object-contain" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold select-none">
                AI Basics
              </div>
            </div>
            <div className="h-36 w-full rounded-xl grid place-items-center relative -ml-[220px] -mt-[-120px] z-20">
              <img src={Cube} alt="Model Build" className="w-full h-[152px] object-contain" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold select-none">
                Model Build
              </div>
            </div>
          </div>
        </div>
        {/* Header */}
        <div className="text-center text-white mb-12 mt-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">🎓 AI 학습 단계별 가이드</h1>
          <p className="text-xl md:text-2xl opacity-90">기초부터 실전까지, 단계별로 마스터하세요</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-12">
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <div
                  className={`flex-1 text-center cursor-pointer transition-all hover:-translate-y-2 ${
                    activeStage === stage.id ? 'scale-110' : ''
                  }`}
                  onClick={() => scrollToStage(stage.id)}
                >
                  <div
                    className={`text-6xl mb-3 ${activeStage === stage.id ? 'animate-bounce' : ''}`}
                  >
                    {stage.icon}
                  </div>
                  <div className="font-bold text-xl text-gray-800 mb-1">{stage.id}단계</div>
                  <div className="text-gray-600">{stage.subtitle}</div>
                </div>
                {index < stages.length - 1 && (
                  <div className="hidden md:block flex-shrink-0 w-24 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {stages.map((stage, index) => (
            <StageCard key={stage.id} stage={stage} stageRef={stageRefs[index]} />
          ))}
        </div>
      </div>
    </div>
  );
}
