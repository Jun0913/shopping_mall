import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main className="flex flex-col items-center justify-center text-gray-800">

      {/* Hero Section */}
      <section className="w-screen h-[60vh] bg-gradient-to-br from-neutral-900 to-neutral-700 text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Modern Fit</h1>
        <p className="text-lg sm:text-xl mb-6">트렌디한 스타일, 합리적인 가격</p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
        >
          지금 쇼핑하기
        </Link>
      </section>

      {/* Category Section */}
      <section className="w-full max-w-6xl py-16 px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">카테고리 둘러보기</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {['남성 상의', '남성 하의', '아우터'].map((category) => (
            <div
              key={category}
              className="bg-gray-100 rounded-lg py-12 shadow hover:shadow-md transition"
            >
              <p className="text-lg font-bold">{category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Best Products Section (placeholder) */}
      <section className="w-full max-w-6xl py-16 px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">베스트 셀러</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white border rounded-lg h-48 flex items-center justify-center shadow"
            >
              <p className="text-gray-400">상품 이미지</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Banner / Info */}
      <section className="bg-gray-100 w-full py-12 px-4 text-center">
        <p className="text-lg font-medium">신규 가입시 10% 할인 쿠폰을 드립니다 🎉</p>
      </section>

    </main>
  );
};

export default LandingPage;
