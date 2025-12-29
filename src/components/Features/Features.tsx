import React, { useState, useEffect, useMemo } from 'react';

interface PromoBannerProps {
  imageUrl?: string;
  endDate?: Date | string;  
  title?: string;
  subtitle?: string;
  discount?: string;
  daysLeft?: number;  
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  imageUrl = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  endDate,
  daysLeft = 2,  
  title = "Большая распродажа",
  subtitle = "Только этой недели! Успейте купить лучшие товары по специальным ценам",
  discount = "до -50%"
}) => {
   const targetDate = useMemo(() => {
    if (endDate) {
      return typeof endDate === 'string' ? new Date(endDate) : endDate;
    }
     const date = new Date();
    date.setDate(date.getDate() + daysLeft);
    date.setHours(23, 59, 59, 999);  
    return date;
  }, [endDate, daysLeft]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0
  });
  
  const [isExpired, setIsExpired] = useState(false);
  const [isClient, setIsClient] = useState(false);

   useEffect(() => {
    setIsClient(true);
  }, []);

   const calculateTimeLeft = () => {
    if (!isClient) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
    }

    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    
    if (difference <= 0) {
      setIsExpired(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
    }
    
    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return { days, hours, minutes, seconds, totalSeconds };
  };

   useEffect(() => {
    if (!isClient) return;

     setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isClient]);

   const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };

   const timerData = [
    { value: formatNumber(timeLeft.days), label: "Дней" },
    { value: formatNumber(timeLeft.hours), label: "Часов" },
    { value: formatNumber(timeLeft.minutes), label: "Минут" },
    { value: formatNumber(timeLeft.seconds), label: "Секунд" }
  ];

   const progressPercentage = useMemo(() => {
    if (daysLeft <= 0) return 100;
    const elapsedHours = (daysLeft * 24) - (timeLeft.days * 24 + timeLeft.hours);
    return Math.min(100, (elapsedHours / (daysLeft * 24)) * 100);
  }, [timeLeft.days, timeLeft.hours, daysLeft]);

  return (
   <div
  className="
    relative overflow-hidden rounded-3xl
    bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90
    p-5 sm:p-8 text-white
    min-h-[300px] sm:min-h-[400px]
  "
>
  {imageUrl && (
    <div className="absolute inset-0 z-0">
      <img
        src={imageUrl}
        alt="Promo background"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-purple-900/70 to-pink-900/70" />
    </div>
  )}

  <div
    className="
      relative z-10
      flex flex-col lg:flex-row
      items-center lg:items-start
      justify-between gap-8
    "
  >
    <div className="max-w-lg text-center lg:text-left">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
        <span className="text-sm font-semibold">🔥 ГОРЯЧЕЕ ПРЕДЛОЖЕНИЕ</span>
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
        {title}
        <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-yellow-300">
          {discount}
        </span>
      </h2>

      <p className="text-blue-100 text-base sm:text-lg mb-6">
        {subtitle}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          className="
            px-8 py-3 bg-white text-blue-600 font-bold
            rounded-xl hover:bg-gray-100 transition-all
            shadow-lg hover:shadow-xl hover:scale-105
            active:scale-95 duration-300
          "
        >
          Смотреть предложения
        </button>

        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              isExpired ? "bg-red-500" : "bg-green-400 animate-pulse"
            }`}
          />
          <span className="text-sm">
            {isExpired ? "Акция завершена" : "Акция заканчивается"}
          </span>
        </div>
      </div>
    </div>

    <div
      className="
        w-full sm:w-auto
        bg-white/10 backdrop-blur-sm rounded-2xl
        p-4 sm:p-6
        border border-white/20 shadow-2xl
      "
    >
      <div className="text-center mb-4">
        <h3 className="font-bold text-lg mb-2">
          {isExpired ? "Акция завершена" : "До конца акции:"}
        </h3>
        {!isExpired && (
          <p className="text-sm text-blue-200">
            Завершится: {targetDate.toLocaleDateString("ru-RU")}
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {timerData.map((time, index) => (
          <div key={index} className="text-center">
            <div
              className="
                bg-white/20 rounded-lg
                p-3 sm:p-4 mb-2
                min-w-[60px] sm:min-w-[70px]
                border border-white/30
              "
            >
              <span className="text-2xl sm:text-3xl font-bold font-mono block">
                {time.value}
              </span>
            </div>
            <span className="text-xs sm:text-sm text-blue-200 font-medium">
              {time.label}
            </span>
          </div>
        ))}
      </div>

      {!isExpired && (
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-200">Время истекает</span>
            <span className="font-bold">
              {timeLeft.days}д {timeLeft.hours}ч {timeLeft.minutes}м
            </span>
          </div>

          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="
                h-full bg-gradient-to-r
                from-green-400 via-yellow-400 to-red-500
                rounded-full transition-all duration-1000
              "
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {isExpired && (
        <div className="text-center py-4">
          <div className="text-2xl mb-2">⏰</div>
          <p className="text-red-200 font-medium">
            Акция завершилась
          </p>
          <button
            className="
              mt-4 px-6 py-2 bg-white/20
              hover:bg-white/30 rounded-lg transition-colors
            "
          >
            Посмотреть другие акции
          </button>
        </div>
      )}
    </div>
  </div>

  <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl" />
  <div className="absolute -top-8 -right-8 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl" />
</div>

  );
};

export default PromoBanner;