import { Button, CardFooter, Col } from 'reactstrap'
import { Cancel, Submit } from '../../utils/Constant'

const CommonCardFooter = () => {
  return (
    <CardFooter className="text-end">
      <Col sm={9} className="offset-sm-3">
        <Button color="primary" className="me-3" type="submit">
          {Submit}
        </Button>
        <Button color="light" type="reset" >
          {Cancel}
        </Button>
      </Col>
    </CardFooter>
  )
}

export default CommonCardFooter