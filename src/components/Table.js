/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styled from "styled-components";
import Modal, {closeStyle} from 'simple-react-modal'

const Wrapper = styled.div`
padding: 20px;
.cursor-pointer {
    cursor: pointer;
}
table {
    border-collapse: collapse;
    background: #dddddd;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    tr {
        background-color: white;
        color: black;
        border-bottom: 1px solid #dddddd;
    }
    thead tr {
        text-align: left;
        text-transform: capitalize;
    }
    td, th {
        padding: 12px 15px;
    }
    tbody tr {
        &.selected {
            background-color: #ccc;
        }
        &:hover {
            background-color: #ccc;
        }
    }
    tbody tr:last-of-type {
        border-bottom: 0
    }

    .capitalize {
        text-transform: capitalize;
    }

    .ml-25 {
        margin-left: 25px;
        display: inline-block;
    }
    .ml-0{
        margin-left: 0;
    }
    .pl-6 {
       padding-left: 6px;
    }

}
`

const Icon = styled.span`
   width: 20px;
   height: 20px;
   border-radius: 50%;
   display: inline-block;
   background-color: #80D234; 
   position: relative;
   top: 5px; 
`

const Row = styled.div`
    display: flex; 
    justify-content: space-between;
    width: 310px;
    padding-left: 17px;
`

const ModalWrapper = styled.div`
    width: 100%;
    padding: 10px 0;
    div {
        padding: 10px;
        span {
            padding: 10px;
        }
    }
    `

function Table({ data, column }) {
    const [selectedRow, setSelectedRow] = React.useState([])
    const [list, setList] = React.useState([]);
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        setList(data);
      }, [data]);


    const onSelect = (e, item) => {
        let updateArr = [...selectedRow]
        if (e.target.checked) {
            updateArr.push(item)
            setSelectedRow(updateArr)
        }else{
            updateArr = updateArr.filter(val => val.name !== item.name)
           setSelectedRow(updateArr)
        }

        let parentCheckbox = document.getElementById("parentCheckbox");


        if (updateArr.length !== data.length) {
            parentCheckbox.indeterminate = true;
        }

        if (updateArr.length === data.length) {
            parentCheckbox.indeterminate = false
            parentCheckbox.checked = true
        }

        if (updateArr.length === 0) {
            parentCheckbox.indeterminate = false
            parentCheckbox.checked = false
        }

    }


    const handleSelectAll = e => {
        const checkboxes = document.querySelectorAll('.childCheckBox');
        const checkboxesArr = Array.from(checkboxes);

        checkboxesArr.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        })

        setSelectedRow(e.target.checked ? data : []); // sync selectedRow state


      };



  return (
    <Wrapper>
     <Row>
       <input type="checkbox" onChange={handleSelectAll} id="parentCheckbox"/>
       <span>Selected {selectedRow.length}</span>
       <span className='cursor-pointer' onClick={()=>setShow(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{width: '20px', verticalAlign: 'top'}}>
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
           Download Selected
        </span>
     </Row>
      <table>
        <thead>
            <tr>
                <th />
                {column.map(val => <th key={val.key}>{val.label}</th>)}
            </tr>
        </thead>
        <tbody>
        {list.map(item => (
            <tr className={selectedRow.find(val=> val.id === item.id) ? 'selected': ''}>
                <td>
                     <input 
                     type="checkbox" 
                     onChange={(e)=> onSelect(e, item)} 
                     className="childCheckBox" />
                </td>
                <td>{item.name}</td>
                <td className="capitalize">{item.device}</td>
                <td>{item.path}</td>
                <td className="capitalize">
                    {item.status === 'available' && <Icon />}
                    <span className={`${item.status === 'available' ? 'ml-0 pl-6' : 'ml-25'}`}>{item.status}</span>
                </td>
            </tr>
        ))}
        </tbody>

      </table>
      <Modal
      style={{background: 'rgb(0, 0, 0, 0.25)',}} //overwrites the default background
      containerStyle={{background: 'white', width: '700px'}}
      closeOnOuterClick={true}
      show={show}
      onClose={()=> setShow(false)}>
          <ModalWrapper>
              {selectedRow.map(file => (
               <div key={file.id}>
                <span>{file.device}</span>
                <span>{file.path}</span>
                {file.status === 'scheduled' ? null : <a href="#">Download</a>}
               </div>
              )
            )}

          </ModalWrapper>
      </Modal>
    </Wrapper>
  );
}


export default Table;
