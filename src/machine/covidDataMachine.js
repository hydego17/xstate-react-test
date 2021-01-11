import { Machine, assign } from "xstate";

const url = "https://covid19.mathdro.id/api";

const invokeFetchStatistics = country => {
  let changedUrl = url;

  if (country !== undefined) {
    changedUrl = `${url}/countries/${country}`;
  }

  return fetch(changedUrl).then(response => response.json());
};

export const createCovidDataMachine = country =>
  Machine(
    {
      id: "covid-data",
      initial: "loading",
      context: {
        country,
        confirmed: null,
        deaths: null,
        recovered: null,
        lastUpdate: null
      },
      states: {
        loading: {
          invoke: {
            id: "fetch-covid-data",
            src: "getStatistics",
            onDone: {
              target: "loaded",
              actions: assign({
                confirmed: (_context, event) => event.data.confirmed.value,
                deaths: (_context, event) => event.data.deaths.value,
                recovered: (_context, event) => event.data.recovered.value,
                lastUpdate: (_context, event) => event.data.lastUpdate
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
    },
    {
      services: {
        getStatistics: (context, _event) =>
          invokeFetchStatistics(context.country)
      }
    }
  );
