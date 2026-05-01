"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  CalendarDays,
  MapPin,
  Tag,
  RefreshCcw,
  BadgeCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { IEvent } from "@/models/Event";

interface EventDetailModalProps {
  event: IEvent | null;
  onClose: () => void;
}

const STATUS_CONFIG: Record<
  IEvent["status"],
  { label: string; color: string; icon: React.ReactNode }
> = {
  Upcoming: {
    label: "Upcoming",
    color: "bg-blue-100 text-blue-700",
    icon: <Clock size={13} />,
  },
  Ongoing: {
    label: "Ongoing",
    color: "bg-amber-100 text-amber-700",
    icon: <RefreshCcw size={13} />,
  },
  Completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle2 size={13} />,
  },
};

export default function EventDetailModal({
  event,
  onClose,
}: EventDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent background scroll
  useEffect(() => {
    if (event) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [event]);

  if (!event) return null;

  const status = STATUS_CONFIG[event.status];
  const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const isFree = !event.cost || event.cost === 0;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="event-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={event.title}
    >
      <div className="event-modal-container">
        {/* Banner Image */}
        <div className="event-modal-banner">
          {event.imageBanner ? (
            <Image
              src={event.imageBanner}
              alt={event.title}
              fill
              className="object-contain w-full h-[70vh]"
            />
          ) : (
            <div className="event-modal-banner-placeholder">
              <CalendarDays size={48} className="text-white/40" />
            </div>
          )}
          {/* Gradient overlay */}
          <div className="event-modal-banner-gradient" />
          {/* Close button */}
          <button
            onClick={onClose}
            className="event-modal-close"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
          {/* Status badge */}
          <span className={`event-modal-status-badge ${status.color}`}>
            {status.icon}
            {status.label}
          </span>
        </div>

        {/* Content */}
        <div className="event-modal-body">
          <h2 className="event-modal-title">{event.title}</h2>
          <p className="event-modal-description">{event.description}</p>

          <div className="event-modal-divider" />

          <ul className="event-modal-meta-list">
            <li className="event-modal-meta-item">
              <span className="event-modal-meta-icon">
                <CalendarDays size={15} />
              </span>
              <div>
                <span className="event-modal-meta-label">Date</span>
                <span className="event-modal-meta-value">{formattedDate}</span>
              </div>
            </li>
            <li className="event-modal-meta-item">
              <span className="event-modal-meta-icon">
                <MapPin size={15} />
              </span>
              <div>
                <span className="event-modal-meta-label">Location</span>
                <span className="event-modal-meta-value">{event.location}</span>
              </div>
            </li>
            <li className="event-modal-meta-item">
              <span className="event-modal-meta-icon">
                <RefreshCcw size={15} />
              </span>
              <div>
                <span className="event-modal-meta-label">Occurrence</span>
                <span className="event-modal-meta-value">
                  {event.occurrence}
                </span>
              </div>
            </li>
            <li className="event-modal-meta-item">
              <span className="event-modal-meta-icon">
                <Tag size={15} />
              </span>
              <div>
                <span className="event-modal-meta-label">Entry</span>
                <span className="event-modal-meta-value">
                  {isFree ? "Free" : `₦${event.cost?.toLocaleString()}`}
                </span>
              </div>
            </li>
          </ul>

          {isFree && (
            <div className="event-modal-free-badge">
              <BadgeCheck size={15} />
              Free entry — all are welcome!
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .event-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .event-modal-container {
          background: #fff;
          border-radius: 20px;
          width: 100%;
          max-width: 480px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .event-modal-banner {
          position: relative;
          height: 50vh;
          background: linear-gradient(135deg, #1b6b3a, #2d9d5a);
        }

        .event-modal-banner-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .event-modal-banner-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(0, 0, 0, 0.45)
          );
        }

        .event-modal-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
          z-index: 10;
        }

        .event-modal-close:hover {
          background: rgba(255, 255, 255, 0.35);
        }

        .event-modal-status-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          z-index: 10;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
        }

        .event-modal-body {
          padding: 20px 24px 24px;
        }

        .event-modal-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.4;
          font-family: Outfit, sans-serif;
          margin-bottom: 6px;
        }

        .event-modal-description {
          font-size: 0.85rem;
          color: #6b7280;
          line-height: 1.6;
        }

        .event-modal-divider {
          height: 1px;
          background: #f3f4f6;
          margin: 16px 0;
        }

        .event-modal-meta-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .event-modal-meta-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .event-modal-meta-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: #f0faf4;
          color: #1b6b3a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .event-modal-meta-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #9ca3af;
          font-weight: 600;
          margin-bottom: 1px;
        }

        .event-modal-meta-value {
          display: block;
          font-size: 0.82rem;
          color: #374151;
          font-weight: 500;
        }

        .event-modal-free-badge {
          margin-top: 16px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0faf4;
          color: #1b6b3a;
          font-size: 12px;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid #c6e8d5;
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
