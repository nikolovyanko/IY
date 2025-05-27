"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown, Compass, Ship, Globe, Star } from "lucide-react"

const watchData = {
  explorer: {
    name: "Explorer Edition",
    description: "Inspired by Magellan's courage to venture into the unknown",
    image: "/placeholder.svg?height=400&width=400",
    color: "from-amber-900 to-orange-800",
  },
  navigator: {
    name: "Navigator Edition",
    description: "Precision crafted for those who chart new courses",
    image: "/placeholder.svg?height=400&width=400",
    color: "from-blue-900 to-indigo-800",
  },
}

const storySections = [
  {
    title: "Началото",
    year: "1480",
    content:
      "Роден в Португалия, в градчето Саброза, Фернандо Магелан (на португалски: Fernão de Magalhães) отрано мечтаел да открие западен морски път към Островите на подправките (днес Молукските острови). Обучен в кралския двор, той придобил опит като мореплавател в Индийския океан и участвал в португалски експедиции до Източна Африка и Индия.",
    image: "/images/young_fm.jpg",
    icon: Star,
  },
  {
    title: "Предложението",
    year: "1518",
    content:
      "След като кралят на Португалия Мануел I отхвърлил неговия план, Магелан се преместил в Испания. Там той убедил испанския крал Карлос I (по-късно император Карл V) да финансира експедиция с цел откриване на западен път към богатите на подправки острови, като едновременно с това Испания щяла да заобиколи Тордесиляския договор с Португалия.",
    image: "/images/proposal.jpg",
    icon: Compass,
  },
  {
    title: "Флотата",
    year: "1519",
    content:
      "На 20 септември 1519 г. от Севиля отплават пет кораба: Тринидад (командван от самия Магелан), Сан Антонио, Консепсион, Виктория и Сантяго, с екипаж от около 270 души от различни националности.",
    image: "/images/fleet.jpg",
    icon: Ship,
  },
  {
    title: "Протокът на Магелан",
    year: "1520",
    content:
      "След дълги месеци плаване покрай южния бряг на Южна Америка, на 21 октомври 1520 г. флотата навлиза в тесен и опасен проток, който Магелан с част от екипажа си, успява да премине успешно. По-късно протокът е наречен Магеланов в негова чест. По време на преминаването корабът Сан Антонио дезертира и се връща в Испания.",
    image: "/images/strait.jpg",
    icon: Globe,
  },
  {
    title: "Тихият океан",
    year: "1520",
    content:
      "След като излиза от пролива през ноември 1520 г., Магелан нарича новия океан „Море на мира“ (лат. Mare Pacificum), заради сравнително спокойните му води в сравнение с бурите в Атлантическия. Липсата на храна и вода превърнало плаването през Тихия океан изключително тежко за екипажа. Който начело с Магелан прекарал над три месеца в открити води, без да срещне суша.",
    image: "/images/pacific.png",
    icon: Compass,
  },
  {
    title: "Филипините и смъртта на Магелан",
    year: "1522",
    content:
      "През март 1521 г. експедицията достигнала Филипините. Магелан се включил в местни междуплеменни конфликти и се опитал да покръсти местното население. На 27 април 1521 г., по време на битка с вожда Лапу-Лапу на остров Мактан, Магелан е убит.",
    image: "/images/death.jpg",
    icon: Star,

  },
  {
    title: "Заветът",
    year: "1522",
    content:
        "Само един кораб, Виктория, с 18 оцелели моряци, се завръща в Испания на 6 септември 1522 г., под командването на баския навигатор Хуан Себастиан Елкано. Това е първата в историята успешно завършена околосветска обиколка. Експедицията доказала не само, че Земята е кръгла, но и че е възможно да се пътува около нея по море. Освен това тя дала безценни географски познания и предначертала нови търговски пътища.",
    image: "/images/legacy.jpg",
    icon: Star,

  }
]

export default function MagellanWatches() {
  const searchParams = useSearchParams()
  const watchType = searchParams.get("watch") || "explorer"
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<number[]>([])

  const currentWatch = watchData[watchType as keyof typeof watchData] || watchData.explorer
  const otherWatch = watchType === "explorer" ? watchData.navigator : watchData.explorer

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev.filter((i) => i !== index), index])
          }
        })
      },
      { threshold: 0.3 },
    )

    document.querySelectorAll(".story-section").forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Hero Section with Watch Images */}
      <section className="min-h-screen relative flex items-center justify-center">
        <div
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
        />

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              IY - Magellan's Story
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">Часовник за съвременния изследовател.
            </p>
          </div>

          {/* Three Watch Images with Different Sizes */}
          <div className="flex items-end justify-center gap-4 max-w-5xl mx-auto">
            {/* Left Image - Medium */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <Image
                  src="/images/watch2.webp"
                  alt="Magellan Watch 1"
                  width={280}
                  height={350}
                  className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Center Image - Large */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <Image
                  src="/images/watch1.webp"
                  alt="Magellan Watch 2"
                  width={360}
                  height={450}
                  className="relative rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right Image - Small */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/15 to-orange-500/15 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500" />
              <Image
                  src="/images/watch3.webp"
                  alt="Magellan Watch 3"
                  width={240}
                  height={300}
                  className="relative rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="text-center mt-16">
            <ChevronDown className="w-8 h-8 mx-auto animate-bounce text-amber-400" />
            <p className="text-sm text-gray-400 mt-2">Кратка История на Фернандо Магелан</p>
          </div>
        </div>
      </section>


      {/* Story Sections */}
      <div className="relative">
        {storySections.map((section, index) => {
          const Icon = section.icon
          const isVisible = visibleSections.includes(index)
          const isEven = index % 2 === 0

          return (
            <section
              key={index}
              data-index={index}
              className="story-section min-h-screen flex items-center py-20 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
                style={{
                  transform: `translateY(${scrollY * 0.1 * (index + 1)}px)`,
                }}
              />

              <div className="container mx-auto px-4 relative z-10">
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${isEven ? "" : "lg:grid-flow-col-dense"}`}>
                  <div
                    className={`${isEven ? "lg:order-1" : "lg:order-2"} transform transition-all duration-1000 ${
                      isVisible
                        ? "translate-x-0 opacity-100"
                        : isEven
                          ? "-translate-x-20 opacity-0"
                          : "translate-x-20 opacity-0"
                    }`}
                  >
                    <div className="flex items-center mb-6">
                      <Icon className="w-8 h-8 text-amber-400 mr-4" />
                      <span className="text-amber-400 font-bold text-lg">{section.year}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {section.title}
                    </h2>
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-300">{section.content}</p>
                  </div>

                  <div
                    className={`${isEven ? "lg:order-2" : "lg:order-1"} transform transition-all duration-1000 delay-300 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                    }`}
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <Image
                        src={section.image || "/placeholder.svg"}
                        alt={section.title}
                        width={800}
                        height={600}
                        className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
             Продължи пътуването
          </h3>
          <p className="text-gray-400 mb-8">Всеки велик изследовател се нуждае от перфектния часовник.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://iywatches.com/products/ferdinand-magellan"
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full font-semibold hover:from-amber-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105"
            >
              InfinitY - FM
            </a>

          </div>
        </div>
      </footer>
    </div>
  )
}
