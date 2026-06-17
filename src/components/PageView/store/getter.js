export default{
    filteredRows_:state => selectRows => {
        if(selectRows.length === 0) return;
        let filteredRows = [];
        selectRows.map(row => {
            if(row.rowStatus !== null){
                filteredRows.push(row)
            }
        });
        return filteredRows;
    }
}