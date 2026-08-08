import React from 'react';
import { Check, CircleDot, Circle, Lock } from 'lucide-react';

export interface MilestoneStage {
  name: string;
  subtitle: string;
  status: 'completed' | 'active' | 'upcoming';
  isLocked?: boolean;
}

interface JourneyTimelineProps {
  currentStageName?: string;
}

export default function JourneyTimeline({ currentStageName = 'Explore' }: JourneyTimelineProps) {
  const stages: MilestoneStage[] = [
    {
      name: 'Discover',
      subtitle: 'Completed initial self-discovery assessment',
      status: 'completed',
    },
    {
      name: 'Explore',
      subtitle: 'Exploring matched careers & what people actually do',
      status: currentStageName === 'Explore' ? 'active' : 'completed',
    },
    {
      name: 'Choose',
      subtitle: 'Lock in your primary direction for the next 90 days',
      status: currentStageName === 'Choose' ? 'active' : 'upcoming',
    },
    {
      name: 'Build',
      subtitle: 'Build your foundational skills & first real-world project',
      status: 'upcoming',
      isLocked: true,
    },
    {
      name: 'Experience',
      subtitle: 'Gain hands-on practical exposure and peer feedback',
      status: 'upcoming',
      isLocked: true,
    },
    {
      name: 'Opportunity',
      subtitle: 'Unlock matched internships, apprenticeships & roles',
      status: 'upcoming',
      isLocked: true,
    },
    {
      name: 'Earn',
      subtitle: 'Establish your career momentum & financial independence',
      status: 'upcoming',
      isLocked: true,
    },
  ];

  return (
    <div className="w-full py-4">
      <div className="relative pl-6 space-y-6 before:absolute before:left-[15px] before:top-3 before:bottom-3 before:w-0.5 before:bg-brand-border">
        {stages.map((stage, idx) => {
          const isCompleted = stage.status === 'completed';
          const isActive = stage.status === 'active';

          return (
            <div key={idx} className="relative flex items-start gap-4 group">
              {/* Milestone Node */}
              <div
                className={`absolute -left-6 top-0.5 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
                    : isActive
                    ? 'bg-brand-primary border-brand-primary text-white ring-4 ring-brand-primary/20 animate-pulse'
                    : 'bg-white border-brand-border text-brand-subtle'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.8]" />
                ) : isActive ? (
                  <CircleDot className="w-4 h-4 stroke-[2.8]" />
                ) : stage.isLocked ? (
                  <Lock className="w-3.5 h-3.5 stroke-[2]" />
                ) : (
                  <Circle className="w-3.5 h-3.5 stroke-[2]" />
                )}
              </div>

              {/* Text Information */}
              <div className="pl-5 pt-0.5">
                <div className="flex items-center gap-2">
                  <h4
                    className={`font-heading text-sm font-semibold tracking-wide uppercase ${
                      isActive
                        ? 'text-brand-primary'
                        : isCompleted
                        ? 'text-brand-dark'
                        : 'text-brand-subtle'
                    }`}
                  >
                    {stage.name}
                  </h4>
                  {isActive && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-primary-light text-brand-primary">
                      Current Stage
                    </span>
                  )}
                  {stage.isLocked && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                      Coming next
                    </span>
                  )}
                </div>
                <p
                  className={`mt-0.5 text-xs ${
                    isActive || isCompleted ? 'text-brand-muted' : 'text-brand-subtle'
                  }`}
                >
                  {stage.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
