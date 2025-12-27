import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Heart, Shield, Truck, CreditCard, Sparkles, Crown } from "lucide-react";
import logo from "../../assets/21.png"

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-gray-800">
      
       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-amber-100 to-pink-100 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        
          
         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
           <div className="space-y-6">
            <div className="flex items-center gap-4">
                             
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
               <div>
                 
                 
              </div>
            </div>
          
          </div>

           <div>
            <h5 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider 
                         flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded" />
              Навигация
            </h5>
            <div className="grid grid-cols-1 gap-4">
              {['Главная', 'Каталог', 'Новинки' ].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm
                           hover:translate-x-1 duration-300 flex items-center gap-2"
                >
                  <div className="w-1 h-1 rounded-full bg-blue-300 opacity-0 group-hover:opacity-100" />
                  {item}
                </a>
              ))}
            </div>
          </div>

           <div>
            <h5 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider 
                         flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-emerald-500 to-green-500 rounded" />
              Поддержка
            </h5>
            <ul className="space-y-3">
              {['Заказы', 'Доставка', 'Возврат', 'Гарантия', 'Контакты'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-emerald-600 transition-colors text-sm
                             flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-200 
                                  group-hover:bg-emerald-500 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

           <div>
            <h5 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider 
                         flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-amber-500 to-orange-500 rounded" />
              Рассылка
            </h5>
            <p className="text-gray-600 text-sm mb-4">
              Получайте эксклюзивные скидки первыми
            </p>
            <div className="relative mb-6">
              <input 
                type="email" 
                placeholder="Ваш email"
                className="w-full px-4 py-3.5 bg-white border border-gray-300 
                         rounded-xl focus:outline-none focus:ring-2 
                         focus:ring-blue-500/30 focus:border-blue-400 
                         text-sm shadow-sm"
              />
              <button className="absolute right-2 top-2 px-4 py-2 bg-gradient-to-r 
                               from-blue-600 to-purple-600 text-white rounded-lg 
                               text-sm font-medium hover:shadow-lg 
                               hover:opacity-90 transition-all">
                Подписаться
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Shield className="w-3 h-3" />
              <span>Без спама. Только важные уведомления.</span>
            </div>
          </div>
        </div>

         <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
             <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Мы в соцсетях:</span>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, color: "from-blue-500 to-blue-700", label: "Facebook" },
                  { icon: Instagram, color: "from-pink-500 to-rose-600", label: "Instagram" },
                  { icon: Twitter, color: "from-sky-500 to-blue-400", label: "Twitter" },
                  { icon: Youtube, color: "from-red-500 to-orange-600", label: "YouTube" }
                ].map((social) => (
                  <a 
                    key={social.label}
                    href="#" 
                    className="group relative"
                    aria-label={social.label}
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${social.color} 
                                  flex items-center justify-center shadow-md 
                                  group-hover:shadow-xl group-hover:scale-110 
                                  transition-all duration-300`}>
                      <social.icon className="w-5 h-5 text-white" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

             <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Crown className="w-4 h-4 text-amber-500" />
                <p className="text-gray-600 text-sm">
                 </p>
              </div>
              <div className="flex gap-6 text-xs">
                {['Конфиденциальность', 'Условия', 'Cookies', 'Карта сайта'].map((item) => (
                  <a 
                    key={item}
                    href="#" 
                    className="text-gray-500 hover:text-blue-600 transition-colors 
                             hover:underline decoration-blue-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

             <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">Принимаем:</div>
              <div className="flex gap-2">
                {['💳', '💰', '🏦', '📱'].map((emoji, i) => (
                  <div 
                    key={i} 
                    className="w-10 h-7 bg-gray-100 rounded-md flex items-center 
                             justify-center text-lg border border-gray-200"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

         <div className="mt-12 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-white">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;