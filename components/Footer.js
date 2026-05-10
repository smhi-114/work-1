"use client";

import {
  Package,
  Truck,
  CreditCard,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Globe,
  Camera,
  Send,
  MessageCircle,
  Mail,
  Phone,
  ArrowRight,
  Download,
  Apple,
  Smartphone,
} from "lucide-react";

export default function Footer() {
  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "ارسال سریع",
      desc: "ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "پرداخت در محل",
      desc: "امکان پرداخت نقدی در محل",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "پشتیبانی ۲۴/۷",
      desc: "پاسخگویی در تمام ساعات شبانه‌روز",
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "ضمانت بازگشت",
      desc: "بازگشت کالا در صورت عدم رضایت",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "ضمانت اصالت",
      desc: "تمامی محصولات اورجینال هستند",
    },
  ];

  const quickLinks = [
    {
      title: "دسته‌بندی‌ها",
      links: ["دیجی‌کالا", "سوپرمارکت", "پوشاک", "لوازم خانگی", "الکترونیک"],
    },
    {
      title: "خدمات مشتریان",
      links: [
        "پیگیری سفارش",
        "شرایط بازگشت کالا",
        "سوالات متداول",
        "تماس با ما",
      ],
    },
    {
      title: "درباره ما",
      links: ["درباره دیجی‌کالا", "فرصت‌های شغلی", "شرکت در کمپین", "وبلاگ"],
    },
    {
      title: "همکاری با ما",
      links: ["فروشنده شوید", "همکاری در فروش", "شرایط همکاری"],
    },
  ];

  const socialLinks = [
    { icon: <Globe className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Camera className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Send className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <MessageCircle className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Features Section */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 bg-red-600 p-2 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="font-extrabold text-2xl text-red-500">
                دیجی‌کالا
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              دیجی‌کالا، بزرگترین فروشگاه اینترنتی ایران با بیش از ۱۰ میلیون
              محصول متنوع
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="bg-gray-700 hover:bg-red-600 p-2 rounded-full transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              {quickLinks.map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-medium text-white mb-2">
                    {section.title}
                  </h4>
                  <ul className="space-y-1">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-white mb-4">خدمات مشتریان</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>پشتیبانی ایمیلی</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>پشتیبانی تلفنی</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  <span>پیگیری سفارش</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>روش‌های پرداخت</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & App */}
          <div>
            <h3 className="font-semibold text-white mb-4">خبرنامه</h3>
            <p className="text-sm text-gray-400 mb-4">
              با عضویت در خبرنامه، از جدیدترین تخفیف‌ها باخبر شوید
            </p>
            <form className="space-y-3 mb-6">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>عضویت</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <h3 className="font-semibold text-white mb-4">دانلود اپلیکیشن</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
              >
                <div className="bg-gray-700 p-2 rounded">
                  <Apple className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">دانلود از</p>
                  <p className="text-sm font-medium text-white">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
              >
                <div className="bg-gray-700 p-2 rounded">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">دانلود از</p>
                  <p className="text-sm font-medium text-white">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © ۱۴۰۳ دیجی‌کالا. تمامی حقوق محفوظ است.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                قوانین و مقررات
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                حریم خصوصی
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                نقشه سایت
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
