import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PATHS from "../../constants/paths";

export default function Home() {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white text-gray-900 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center space-y-6 mb-12">
              <h1 className="text-6xl font-extrabold leading-tight">
                <span className="block">Memo AI</span>
                <span className="text-4xl font-light opacity-90">
                  지능형 메모 관리
                </span>
              </h1>
              <p className="text-xl max-w-3xl leading-relaxed">
                자연어로 할 일을 입력하면 AI가 자동으로 구조화된 메모로
                변환해주는 지능형 메모 관리 서비스입니다.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              {!token ? (
                <>
                  <Link
                    to={PATHS.AUTH.SIGNUP}
                    className="flex-1 px-8 py-4 bg-gray-200 text-gray-900 font-semibold cursor-pointer"
                  >
                    시작하기
                  </Link>
                  <Link
                    to={PATHS.AUTH.LOGIN}
                    className="flex-1 px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold cursor-pointer"
                  >
                    로그인
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={PATHS.ROOT.MEMO_CREATE}
                    className="flex-1 px-8 py-4 bg-gray-200 text-gray-900 font-semibold cursor-pointer"
                  >
                    메모 작성하기
                  </Link>
                  <Link
                    to={PATHS.ROOT.MEMO_LIST}
                    className="flex-1 px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold cursor-pointer"
                  >
                    메모 목록 보기
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            주요 기능
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            AI 기술을 활용하여 할 일 관리를 더욱 쉽고 효율적으로 만들어드립니다.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-8 bg-white flex-1">
            <div className="text-5xl mb-6">🤖</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              AI 자연어 처리
            </h3>
            <p className="text-gray-600 leading-relaxed">
              "내일 오후 3시에 회의 준비하기"와 같은 자연어를 입력하면 AI가
              자동으로 구조화된 메모로 변환합니다.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-8 bg-white flex-1">
            <div className="text-5xl mb-6">📝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              스마트 메모 생성
            </h3>
            <p className="text-gray-600 leading-relaxed">
              할 일 내용, 마감일, 우선순위, 카테고리를 자동으로 추출하여
              체계적인 메모를 생성합니다.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-8 bg-white flex-1">
            <div className="text-5xl mb-6">📊</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              효율적인 관리
            </h3>
            <p className="text-gray-600 leading-relaxed">
              메모 목록에서 상태를 변경하고, 지연된 할 일을 확인하며, 완료된
              작업을 관리할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* How it works Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
              사용 방법
            </h2>
            <p className="text-lg text-gray-600">
              간단한 3단계로 할 일을 효율적으로 관리하세요.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="flex items-center justify-center w-20 h-20 bg-gray-200 text-gray-900 text-3xl font-bold rounded-full mb-6">
                1
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                자연어로 입력
              </h3>
              <p className="text-gray-600 leading-relaxed">
                "내일 오전 10시에 프로젝트 보고서 작성하기"와 같이 자연스러운
                문장으로 할 일을 입력합니다.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="flex items-center justify-center w-20 h-20 bg-gray-200 text-gray-900 text-3xl font-bold rounded-full mb-6">
                2
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                AI가 구조화
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AI가 입력된 내용을 분석하여 할 일 내용, 마감일, 우선순위,
                카테고리로 자동 분류합니다.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="flex items-center justify-center w-20 h-20 bg-gray-200 text-gray-900 text-3xl font-bold rounded-full mb-6">
                3
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                메모로 저장
              </h3>
              <p className="text-gray-600 leading-relaxed">
                구조화된 메모를 확인하고 저장하여 체계적으로 할 일을 관리합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-200 text-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center space-y-6 mb-8">
              <h2 className="text-4xl font-extrabold">지금 시작해보세요</h2>
              <p className="text-xl max-w-2xl leading-relaxed">
                AI 기술로 더욱 스마트한 할 일 관리를 경험해보세요.
              </p>
            </div>

            <div className="flex justify-center">
              {!token ? (
                <Link
                  to={PATHS.AUTH.SIGNUP}
                  className="px-10 py-4 bg-gray-900 text-white font-semibold cursor-pointer"
                >
                  무료로 시작하기
                </Link>
              ) : (
                <Link
                  to={PATHS.ROOT.MEMO_CREATE}
                  className="px-10 py-4 bg-gray-900 text-white font-semibold cursor-pointer"
                >
                  메모 작성하기
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
