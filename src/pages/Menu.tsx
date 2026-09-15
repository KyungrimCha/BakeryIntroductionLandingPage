import { useState } from 'react'
import { Link } from 'react-router'

const CATEGORIES = ['전체', '식사빵', '페이스트리', '케이크', '브런치'] as const
type Category = (typeof CATEGORIES)[number]

interface MenuItem {
  cat: Exclude<Category, '전체'>
  name: string
  price: string
  desc: string
}

const ITEMS: MenuItem[] = [
  // 식사빵
  { cat: '식사빵', name: '통밀 사워도우', price: '6,500', desc: '48시간 저온 발효, 고소하고 쫄깃한 식감' },
  { cat: '식사빵', name: '캄파뉴', price: '7,200', desc: '홀 그레인과 호밀의 조화로운 균형' },
  { cat: '식사빵', name: '바게트', price: '4,800', desc: '바삭한 크러스트, 기포 가득한 속살' },
  { cat: '식사빵', name: '호밀 브레드', price: '6,000', desc: '유기농 호밀로 구운 담백한 건강빵' },
  // 페이스트리
  { cat: '페이스트리', name: '버터 크루아상', price: '4,200', desc: '프랑스산 버터로 결결이 쌓은 황금빛 결' },
  { cat: '페이스트리', name: '판 오 쇼콜라', price: '4,800', desc: '발로나 다크 초콜릿을 품은 페이스트리' },
  { cat: '페이스트리', name: '아망드 크루아상', price: '5,200', desc: '아몬드 크림과 플레이크의 달콤한 마무리' },
  { cat: '페이스트리', name: '에그 타르트', price: '4,000', desc: '부드러운 커스터드와 바삭한 타르트 셸' },
  // 케이크
  { cat: '케이크', name: '얼 그레이 파운드', price: '5,800', desc: '베르가못 향이 은은하게 퍼지는 파운드케이크' },
  { cat: '케이크', name: '딸기 쇼트케이크', price: '6,200', desc: '제철 딸기와 생크림의 클래식한 조합' },
  { cat: '케이크', name: '레몬 타르트', price: '5,500', desc: '상큼한 레몬 커드와 이탈리안 머랭' },
  { cat: '케이크', name: '가나슈 케이크', price: '6,800', desc: '진한 다크 초콜릿 가나슈의 깊은 풍미' },
  // 브런치
  { cat: '브런치', name: '베이커리 플레이트', price: '18,000', desc: '오늘의 빵 3종 + 버터 + 잼 + 아메리카노' },
  { cat: '브런치', name: '수란 브런치', price: '22,000', desc: '에그 베네딕트 스타일, 홀란다이즈 소스' },
  { cat: '브런치', name: '바게트 세트', price: '16,500', desc: '바게트 + 수프 + 샐러드 + 음료' },
  { cat: '브런치', name: '어니언 수프 세트', price: '19,500', desc: '전통 프렌치 어니언 수프 + 빵 + 음료' },
]

export default function Menu() {
  const [active, setActive] = useState<Category>('전체')

  const filtered = active === '전체' ? ITEMS : ITEMS.filter((item) => item.cat === active)

  return (
    <div className="viewport">
      {/* Same background image, slightly different crop */}
      <div className="bg">
        <img
          src="https://images.unsplash.com/photo-1644015272264-2d70518c2046?w=2400&h=1350&fit=crop&auto=format&crop=right"
          alt="온기 베이커리의 다양한 빵과 페이스트리 진열대"
        />
      </div>

      <div className="scrim" aria-hidden="true" />

      {/* Glass menu sheet */}
      <div className="menu-sheet">
        <div className="menu-inner">
          {/* Top bar */}
          <div className="menu-bar">
            <Link to="/" className="menu-back" aria-label="메인으로 돌아가기">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 13L5 8l5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              돌아가기
            </Link>

            <div className="menu-brand-row">
              <svg
                className="mark"
                viewBox="0 0 100 100"
                aria-hidden="true"
                fill="none"
                style={{ position: 'static', width: 'var(--menu-mark-size)', height: 'var(--menu-mark-size)' }}
              >
                <path fill="#fff" d="M 45.13 1.28 L 54.87 1.28 L 54.87 42.42 L 45.13 38.09 Z" />
                <path fill="#fff" d="M 79.47 12.10 L 87.90 20.53 L 58.80 49.62 L 53.45 38.13 Z" />
                <path fill="#fff" d="M 98.72 45.13 L 98.72 54.87 L 57.58 54.87 L 61.91 45.13 Z" />
                <path fill="#fff" d="M 87.90 79.47 L 79.47 87.90 L 50.38 58.80 L 61.87 53.45 Z" />
                <path fill="#fff" d="M 54.87 98.72 L 45.13 98.72 L 45.13 57.58 L 54.87 61.91 Z" />
                <path fill="#fff" d="M 20.53 87.90 L 12.10 79.47 L 41.20 50.38 L 46.55 61.87 Z" />
                <path fill="#fff" d="M 1.28 54.87 L 1.28 45.13 L 42.42 45.13 L 38.09 54.87 Z" />
                <path fill="#fff" d="M 12.10 20.53 L 20.53 12.10 L 49.62 41.20 L 38.13 46.55 Z" />
              </svg>
              <span className="menu-wordmark">온기</span>
            </div>
          </div>

          <div className="menu-rule" aria-hidden="true" />

          {/* Category tabs */}
          <div className="menu-tabs" role="tablist" aria-label="메뉴 카테고리">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                className={`menu-tab${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="menu-rule" aria-hidden="true" />

          {/* Menu grid */}
          <div className="menu-body" role="tabpanel">
            <div className="menu-grid">
              {filtered.map((item, i) => (
                <div key={`${item.cat}-${item.name}`} className="menu-card" style={{ animationDelay: `${i * 35}ms` }}>
                  <p className="menu-card-cat">{item.cat}</p>
                  <p className="menu-card-name">{item.name}</p>
                  <p className="menu-card-price">₩{item.price}</p>
                  <p className="menu-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
