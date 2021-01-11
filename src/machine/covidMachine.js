import { Machine, assign, spawn } from "xstate";
import { createCovidDataMachine } from "./covidDataMachine";

const urlCountries = "https://covid19.mathdro.id/api/countries";

const fetchCountriesState = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "fetch-countries",
        src: "getListCountries",
        onDone: {
          target: "loaded",
          actions: assign({
            listCountries: (_, event) => event.data.countries
          })
        },
        onError: {
          target: "failure"
        }
      }
    },
    loaded: {
      type: "final"
    },
    failure: {
      on: {
        RETRY: "loading"
      }
    }
  }
};

export const covidMachine = Machine(
  {
    id: "covid-machine",
    initial: "idle",
    context: {
      listCountries: [],
      statistics: {},
      countryStat: null
    },
    states: {
      idle: {
        ...fetchCountriesState
      },
      selected: {}
    },
    on: {
      SELECT: {
        target: ".selected",
        actions: assign((context, event) => {
          let countryStat = context.statistics[event.name];

          if (countryStat) {
            return {
              ...context,
              countryStat
            };
          }

          countryStat = spawn(createCovidDataMachine(event.name));
          return {
            ...context,
            statistics: {
              ...context.statistics,
              [event.name]: countryStat
            },
            countryStat
          };
        })
      }
    }
  },
  {
    services: {
      getListCountries: (context, event) =>
        fetch(urlCountries).then(response => response.json())
    }
  }
);
