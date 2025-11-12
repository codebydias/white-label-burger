/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Phone, Clock } from "lucide-react";
import { useConfig } from "../context/config-context";

const Locations = () => {
  const { locations } = useConfig() || {};

  if (!locations?.length) return null;

  return (
    <section id="locations" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Nossas Localizações
            </h2>
            <p className="text-lg text-muted-foreground">
              Encontre a unidade mais próxima de você
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location: any, index: number) => (
              <div
                key={index}
                className="bg-card p-8 rounded-lg border border-border space-y-6"
              >
                <h3 className="text-2xl font-bold text-primary">
                  {location.name}
                </h3>

                <div className="space-y-4">
                  {location.address && (
                    <div className="flex items-start gap-3">
                      <MapPin
                        className="text-primary mt-1 flex-shrink-0"
                        size={20}
                      />
                      <p className="text-foreground">{location.address}</p>
                    </div>
                  )}

                  {location.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="text-primary flex-shrink-0" size={20} />
                      <p className="text-foreground">{location.phone}</p>
                    </div>
                  )}

                  {location.hours && (
                    <div className="flex items-center gap-3">
                      <Clock className="text-primary flex-shrink-0" size={20} />
                      <p className="text-foreground">{location.hours}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
