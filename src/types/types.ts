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

export type PlanetsContextType = {
  planetsInfo: PlanetType[]
  // handleChange: (event:React.ChangeEvent<HTMLInputElement>) => void
  setPlanets: (planets:PlanetType[]) => void
  loading:boolean
};
