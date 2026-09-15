import { useEffect } from 'react'
import { Link } from 'react-router'

// Add entrance class before first paint (runs once at module load)
if (typeof window !== 'undefined') {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduced && !document.documentElement.dataset.entered) {
    document.documentElement.classList.add('js-enter')
  }
}

export default function Landing() {
  useEffect(() => {
    if (document.documentElement.dataset.entered) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const isMobile = window.matchMedia('(max-width: 648px)').matches
    const d = isMobile ? 0.62 : 1
    const t = isMobile ? 0.85 : 1

    const EXPO = [0.16, 1, 0.3, 1]
    const SOFT = [0.22, 0.65, 0.28, 1]
    const SETTLE = [0.33, 1, 0.68, 1]
    const ease = (pts: number[]) => `cubic-bezier(${pts.join(',')})`
    const anims: Animation[] = []

    function anim(
      el: Element | null,
      kf: Keyframe[],
      dur: number,
      delay: number,
      easing: number[]
    ) {
      if (!el) return
      anims.push(
        el.animate(kf, {
          duration: dur * t,
          delay: delay * t,
          fill: 'forwards',
          easing: ease(easing),
        })
      )
    }

    const qs = (s: string) => document.querySelector(s)
    const qsa = (s: string) => Array.from(document.querySelectorAll(s))
    const rise = (px: number): Keyframe[] => [
      { opacity: 0, transform: `translateY(${px * d}px)` },
      { opacity: 1, transform: 'translateY(0)' },
    ]

    anim(qs('.eyebrow'), rise(12), 560, 60, SOFT)
    anim(qs('.headline'), [
      { transform: 'translate3d(0,118%,0)' },
      { transform: 'translate3d(0,0,0)' },
    ], 950, 170, EXPO)
    anim(qs('.lede'), rise(14), 660, 430, SOFT)
    anim(qs('.cta'), [
      { opacity: 0, transform: `translateY(${12 * d}px) scale(0.985)` },
      { opacity: 1, transform: 'translateY(0) scale(1)' },
    ], 580, 620, SETTLE)
    anim(qs('.mark'), rise(10), 540, 600, SOFT)
    anim(qs('.wordmark'), rise(10), 540, 600, SOFT)
    anim(qs('.tagline'), rise(10), 540, 670, SOFT)
    qsa('.col').forEach((col, i) => anim(col, rise(14), 580, 720 + i * 70, SOFT))
    anim(qs('.rule'), [
      { transform: 'scaleX(0)' },
      { transform: 'scaleX(1)' },
    ], 720, 980, EXPO)
    anim(qs('.legal'), rise(8), 500, 1120, SOFT)
    qsa('.socials a').forEach((a, i) => anim(a, rise(8), 500, 1170 + i * 60, SOFT))

    const cleanup = setTimeout(() => {
      document.documentElement.classList.remove('js-enter')
      document.documentElement.dataset.entered = '1'
      anims.forEach((a) => a.cancel())
    }, (1170 + 2 * 60 + 500) * t + 80)

    return () => clearTimeout(cleanup)
  }, [])

  return (
    <div className="viewport">
      <div className="bg">
        <img
          src="https://images.unsplash.com/photo-1644015272264-2d70518c2046?w=2400&h=1350&fit=crop&auto=format"
          alt="따뜻한 빛 아래 갓 구워진 빵들로 가득한 온기 베이커리 진열대"
        />
      </div>

      <div className="scrim" aria-hidden="true" />

      <div className="stage">
        <p className="eyebrow">매일 새벽, 손으로 빚어냅니다</p>
        <div className="headline-mask">
          <h1 className="headline">따뜻한 빵 한 조각</h1>
        </div>
        <p className="lede">
          유기농 밀가루와 천연 발효종으로 새벽부터 정성껏 구워냅니다.
          <br />
          바삭한 크러스트와 촉촉한 속살이 빚어내는 완벽한 균형을 경험하세요.
        </p>
        <Link className="cta" to="/menu">
          <span>메뉴 보기</span>
        </Link>
      </div>

      <footer className="footer">
        <div className="finner">
          <div className="brandrow">
            <svg className="mark" viewBox="0 0 100 100" aria-hidden="true" fill="none">
              <path fill="#fff" d="M 45.13 1.28 L 54.87 1.28 L 54.87 42.42 L 45.13 38.09 Z" />
              <path fill="#fff" d="M 79.47 12.10 L 87.90 20.53 L 58.80 49.62 L 53.45 38.13 Z" />
              <path fill="#fff" d="M 98.72 45.13 L 98.72 54.87 L 57.58 54.87 L 61.91 45.13 Z" />
              <path fill="#fff" d="M 87.90 79.47 L 79.47 87.90 L 50.38 58.80 L 61.87 53.45 Z" />
              <path fill="#fff" d="M 54.87 98.72 L 45.13 98.72 L 45.13 57.58 L 54.87 61.91 Z" />
              <path fill="#fff" d="M 20.53 87.90 L 12.10 79.47 L 41.20 50.38 L 46.55 61.87 Z" />
              <path fill="#fff" d="M 1.28 54.87 L 1.28 45.13 L 42.42 45.13 L 38.09 54.87 Z" />
              <path fill="#fff" d="M 12.10 20.53 L 20.53 12.10 L 49.62 41.20 L 38.13 46.55 Z" />
            </svg>
            <span className="wordmark">온기</span>
          </div>

          <p className="tagline">
            갓 구운 빵 한 조각으로 시작하는, 따뜻하고 특별한 하루.
          </p>

          <nav className="nav" aria-label="푸터 내비게이션">
            <div className="col c1">
              <h3>메뉴</h3>
              <ul>
                <li><a href="#">식사빵</a></li>
                <li><a href="#">페이스트리</a></li>
                <li><a href="#">케이크</a></li>
                <li><a href="#">브런치 세트</a></li>
              </ul>
            </div>
            <div className="col c2">
              <h3>이야기</h3>
              <ul>
                <li><a href="#">우리의 이야기</a></li>
                <li><a href="#">베이커 소개</a></li>
                <li><a href="#">재료 철학</a></li>
                <li><a href="#">수상 내역</a></li>
              </ul>
            </div>
            <div className="col c3">
              <h3>방문</h3>
              <ul>
                <li><a href="#">영업시간</a></li>
                <li><a href="#">오시는 길</a></li>
                <li><a href="#">테이블 예약</a></li>
                <li><a href="#">문의하기</a></li>
              </ul>
            </div>
          </nav>

          <div className="rule" aria-hidden="true" />

          <div className="footrow">
            <p className="legal">® 2025 온기 베이커리. All rights reserved.</p>
            <div className="socials">
              <a href="#" aria-label="인스타그램">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" aria-label="네이버 블로그">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
                </svg>
              </a>
              <a href="#" aria-label="카카오톡 채널">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.672 2 11.2c0 2.899 1.676 5.45 4.215 6.998l-.935 3.502a.4.4 0 0 0 .59.453l4.102-2.127A12.4 12.4 0 0 0 12 20.4c5.523 0 10-3.672 10-8.2S17.523 3 12 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
