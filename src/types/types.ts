export type PlanetType = {
  climate:string,
  created:string,
  diameter:string,
  edited:string,
  films: string[],
  gravity:string,
  name:string,
  orbital_period:string,
  population:string,
  rotation_period:string,
  surface_water:string,
  terrain:string,
  url:string,
};

export type FilterType = {
  id:number,
  name: string,
  column: string,
  comparison: string,
  value: string,
};

export type PlanetsContextType = {
  planets: PlanetType[]
  filters: FilterType[],
  setFilters: (filter:FilterType[]) => void,
  setPlanets: (planets:PlanetType[]) => void
  planetsFiltered:PlanetType[]
  setplanetsFiltered:(planets:PlanetType[]) => void
  loading:boolean
  // handleChange: (event:React.ChangeEvent<HTMLInputElement>) => void
};
