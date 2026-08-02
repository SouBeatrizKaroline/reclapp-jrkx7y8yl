import { useEffect, useState } from 'react'
import { getEcoPontos } from '@/services/ecopontos'
import { EcoPonto } from '@/types'
import { MapPin, Phone, Clock, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Mapa() {
  const [ecopontos, setEcoPontos] = useState<EcoPonto[]>([])
  const [selected, setSelected] = useState<EcoPonto | null>(null)

  useEffect(() => {
    getEcoPontos()
      .then((data) => {
        setEcoPontos(data)
        if (data.length > 0) setSelected(data[0])
      })
      .catch(() => {})
  }, [])

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-600" />
            Ecopontos Credenciados
          </h1>
          <p className="text-xs text-muted-foreground">
            Encontre o local de descarte correto mais próximo de você.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3 md:col-span-1 max-h-[500px] overflow-y-auto pr-1">
          {ecopontos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${selected?.id === item.id ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 shadow-sm' : 'bg-card hover:border-gray-300'}`}
            >
              <h3 className="font-bold text-sm">{item.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.address}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  ★ {item.rating || '4.8'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 bg-card border rounded-2xl p-6 flex flex-col justify-between space-y-4">
          {selected ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                  Ecoponto Selecionado
                </span>
                <h2 className="text-xl font-bold">{selected.name}</h2>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {selected.address}
                </p>
              </div>

              <div className="space-y-2 text-xs">
                {selected.hours && (
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{selected.hours}</span>
                  </p>
                )}
                {selected.phone && (
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>{selected.phone}</span>
                  </p>
                )}
              </div>

              <div>
                <h4 className="font-bold text-xs mb-2">Materiais Aceitos:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selected.materials_accepted?.map((mat) => (
                    <span
                      key={mat}
                      className="text-[11px] font-semibold px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-lg capitalize"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Selecione um ecoponto para ver detalhes.
            </p>
          )}

          <a
            href={`https://maps.google.com/?q=${selected?.latitude || -23.5645},${selected?.longitude || -46.6989}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-2">
              <MapPin className="w-4 h-4" /> Abrir no Google Maps
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
