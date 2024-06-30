export default (dataset) => {
    const hashTable = Object.create(null)
    dataset.forEach(aData => hashTable[aData.id] = {...aData, children: []})
    const dataTree = [];
    dataset.forEach(Datae => {  
      if (JSON.parse(Datae.parents)  && JSON.parse(Datae.parents).length > 0) {    
        JSON.parse(Datae.parents).forEach( aData => {    
          hashTable[aData].children.push(hashTable[Datae.id])
      });
      }
      else{
        dataTree.push(hashTable[Datae.id])
      }
      
    });
    return dataTree;
  };   