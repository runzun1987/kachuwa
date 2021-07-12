import React,{ useState } from 'react';
import List from './List12';

const Comp = ({
  img,
  setUrl,
  setId,
  name,
  list,
  mainId,
  setFixIds,
  fixIds,
  compIndex,
  totalComp,
  data,
  id,
  setClickedMainId,
  clickMainId,
  fixCompIndex,
  setFixCompIndex,
  setPureId,
  pureId,
  clickTrack,
  setClickTrack,
  setState,
  state,
  activeIndexArr,
  setActiveIndexArr,
  pureIdArr,
  setPureIdArr,
  // reverse,
  // setReverse
  storingArr,
  setStoringArr,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const storeAdv = [];
  const tempStore = storingArr;
  const checkInclude = (a, b) => b.some((v1) => a.includes(v1));

  let conditon = false;
  const x = [];
  let counter = 0;
  const z = clickTrack;
  return (
    <div className="comp">
      <h3>{name}:</h3>
      <ul>
        {list &&
          list.map((l, ind) => {
            const combinedId = mainId + ':' + l.id;

            if (id) {
              let totalQuantity = 0;
              storeAdv.push(mainId + ':' + l.id);
              tempStore[compIndex] = storeAdv;
              setStoringArr(tempStore);

              var filtered = activeIndexArr.filter(function (el) {
                return el != null;
              });

              if (filtered.length ) {
                for (let j = 0; j < clickTrack.length; j++) {
                  if (j !== compIndex) {
                    const maping = storingArr[compIndex].map((sto) => [
                      sto,
                      clickTrack[j],
                    ]);

                    const toCheckArr = maping[ind];

                    for (let i = 0; i < data.length; i++) {
                      const arraysEqual = (a, b) => {
                        if (a === b) return true;
                        if (a == null || b == null) return false;
                        if (a.length !== b.length) return false;

                        // If you don't care about the order of the elements inside
                        // the array, you should sort both arrays here.
                        const x = [...a].sort();
                        const y = [...b].sort();
                        // Please note that calling sort on an array will modify that array.
                        // you might want to clone your array first.

                        for (var i = 0; i < a.length; ++i) {
                          if (x[i] !== y[i]) return false;
                        }
                        return true;
                      };

                      if (
                        arraysEqual(data[i].properties.split(';'), toCheckArr)
                      ) {
                        if (data[i].quantity === '0') {
                          conditon = true;
                        } else {
                          conditon = false;
                        }

                        break;
                      } else {
                        conditon = true;
                      }

                      
                    }
                  }
                }
              } 
            }
         

            return (
              <List
                ind={ind}
                listName={l.name}
                listId={l.id}
                mainId={mainId}
                img={img}
                activeIndex={activeIndex}
                setUrl={setUrl}
                setActiveIndex={setActiveIndex}
                fixIds={fixIds}
                compIndex={compIndex}
                setId={setId}
                conditon={conditon}
                setClickedMainId={setClickedMainId}
                setFixCompIndex={setFixCompIndex}
                setPureId={setPureId}
                setClickTrack={setClickTrack}
                clickTrack={clickTrack}
                setState={setState}
                state={state}
                id={Math.random()}
                activeIndexArr={activeIndexArr}
                setActiveIndexArr={setActiveIndexArr}
                pureIdArr={pureIdArr}
                setPureIdArr={setPureIdArr}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default Comp;
