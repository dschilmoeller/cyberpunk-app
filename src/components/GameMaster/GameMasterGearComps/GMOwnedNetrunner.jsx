import { Paper, Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Button } from '@mui/material';

// TODO
// Just this whole damn thing.
export default function GMOwnedNetrunner({ charDetail, charNetrunnerGear, deleteCharacterGear }) {
  return (
    <>
      <h2>{charDetail.handle}&apos;s Netrunning Equipment</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Equipped?</TableCell>
              <TableCell align="center">Remove?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charNetrunnerGear.map((item, i) => {
              return (
                <TableRow hover key={i}>
                  <TableCell align="left">{item.name} </TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">{item.equipped ? 'Yes' : 'No'}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => deleteCharacterGear({ type: 'netrunner', data: item.netrunner_bridge_id })}>Remove</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
