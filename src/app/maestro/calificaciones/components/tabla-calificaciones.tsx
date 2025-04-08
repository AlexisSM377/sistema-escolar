"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { getCalificacionesByGrupo, actualizarCalificaciones } from "../actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type Alumno = {
  id_inscripcion: string;
  nombre: string;
  matricula: string;
  primer_parcial: number | null;
  segundo_parcial: number | null;
  tercer_parcial: number | null;
  calificacion_final: number | null;
};

export default function CalificacionesTabla({ idGrupo }: { idGrupo: string }) {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const { inscripciones, error } = await getCalificacionesByGrupo(idGrupo);

        if (error) {
          toast({
            title: "Error",
            description: error.message || "No se pudieron cargar los alumnos",
            variant: "destructive",
          });
          return;
        }

        const alumnos = inscripciones.map((inscripcion: any) => ({
          id_inscripcion: inscripcion.id,
          nombre: inscripcion.usuarios.nombre,
          matricula: inscripcion.usuarios.matricula,
          primer_parcial: inscripcion.calificaciones?.primer_parcial ?? null,
          segundo_parcial: inscripcion.calificaciones?.segundo_parcial ?? null,
          tercer_parcial: inscripcion.calificaciones?.tercer_parcial ?? null,
          calificacion_final: inscripcion.calificaciones?.calificacion_final ?? null,
        }));

        setAlumnos(alumnos);
      } catch (error) {
        toast({
          title: "Error",
          description: "Ocurrió un error al cargar los datos" + (error as Error).message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAlumnos();
  }, [idGrupo]);

  const handleInputChange = (id_inscripcion: string, field: string, value: string) => {
    setAlumnos((prev) =>
      prev.map((alumno) => {
        if (alumno.id_inscripcion === id_inscripcion) {
          const updatedAlumno = {
            ...alumno,
            [field]: value ? parseFloat(value) : null,
          };

          // Calcular automáticamente la calificación final si los tres parciales están completos
          if (
            updatedAlumno.primer_parcial !== null &&
            updatedAlumno.segundo_parcial !== null &&
            updatedAlumno.tercer_parcial !== null
          ) {
            updatedAlumno.calificacion_final =
              (updatedAlumno.primer_parcial +
                updatedAlumno.segundo_parcial +
                updatedAlumno.tercer_parcial) /
              3;
          }

          return updatedAlumno;
        }
        return alumno;
      })
    );
  };

  const handleGuardar = async () => {
    try {
      for (const alumno of alumnos) {
        const { error } = await actualizarCalificaciones(alumno);

        if (error) {
          toast({
            title: "Error",
            description: `No se pudo guardar la calificación de ${alumno.nombre}`,
            variant: "destructive",
          });
          return;
        }
      }

      toast({
        title: "Éxito",
        description: "Calificaciones guardadas correctamente",
        variant: "default",
      });

      router.push('/maestro/calificaciones');
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar las calificaciones" + (error as Error).message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-6">Cargando alumnos...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro de Calificaciones</CardTitle>
        <CardDescription>
          Ingresa las calificaciones de los alumnos
        </CardDescription>
      </CardHeader>
      <CardContent>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matrícula</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Primer Parcial</TableHead>
              <TableHead>Segundo Parcial</TableHead>
              <TableHead>Tercer Parcial</TableHead>
              <TableHead>Calificación Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alumnos.map((alumno) => (
              <TableRow key={alumno.id_inscripcion}>
                <TableCell>{alumno.matricula}</TableCell>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="1-10"
                    value={alumno.primer_parcial ?? ""}
                    min={1}
                    max={10}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value >= 1 && value <= 10) {
                        handleInputChange(alumno.id_inscripcion, "primer_parcial", e.target.value);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="1-10"
                    min={1}
                    max={10}
                    value={alumno.segundo_parcial ?? ""}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value >= 1 && value <= 10) {
                        handleInputChange(alumno.id_inscripcion, "segundo_parcial", e.target.value)
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="1-10"
                    min={1}
                    max={10}
                    value={alumno.tercer_parcial ?? ""}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value >= 1 && value <= 10) {
                        handleInputChange(alumno.id_inscripcion, "tercer_parcial", e.target.value)
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="0-10"
                    value={alumno.calificacion_final ?? ""}
                    readOnly
                  />
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
        <div className="flex justify-end p-4">
          <Button onClick={handleGuardar}>
            Guardar Calificaciones
          </Button>
        </div>
      </CardContent>


    </Card>
  );
}