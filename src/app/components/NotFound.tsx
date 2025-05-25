"use client";

import Link from "next/link";
import {
  House,
  ArrowLeft,
  MapPin,
  Building,
  Users,
} from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl w-full mx-4 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-500 animate-pulse">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-2">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600 mb-8">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>
        </div>

        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/emlak/konut/satilik/"
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Building className="w-8 h-8 text-primary-500 mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-800 group-hover:text-primary-500">
                Satılık Konutlar
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Daire, villa ve daha fazlası
              </p>
            </Link>
            <Link
              href="/emlak/ticari/satilik/"
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <MapPin className="w-8 h-8 text-primary-500 mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-800 group-hover:text-primary-500">
                Ticari Gayrimenkul
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Ofis, dükkan ve plaza
              </p>
            </Link>
            <Link
              href="https://www.retroia.com/projeler/"
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Users className="w-8 h-8 text-primary-500 mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-800 group-hover:text-primary-500">
                Yeni Projeler
              </h3>
              <p className="text-sm text-gray-600 mt-1">Yatırımlık fırsatlar</p>
            </Link>
          </div>

          {/* Popular Categories */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Popüler Kategoriler
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/emlak/konut/kiralik/"
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-primary-500 hover:scale-105"
              >
                Kiralık Konutlar
              </Link>
              <Link
                href="/emlak/ticari/kiralik/"
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-primary-500 hover:scale-105"
              >
                Kiralık Ticari
              </Link>
              <Link
                href="/emlak/arsa-arazi/satilik/"
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-primary-500 hover:scale-105"
              >
                Satılık Arsa
              </Link>
              <Link
                href="/emlak/arsa-arazi/kiralik/"
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-primary-500 hover:scale-105"
              >
                Kiralık Arsa
              </Link>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              href="/emlak/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-200 hover:scale-105"
            >
              <House className="w-5 h-5 mr-2" />
              Ana Sayfaya Dön
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Önceki Sayfaya Dön
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
