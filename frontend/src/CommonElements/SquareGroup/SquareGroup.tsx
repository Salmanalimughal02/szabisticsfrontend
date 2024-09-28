import UL from "../ListGroup/UnorderedList";
import LI from "../ListGroup/ListItem";

const SquareGroup = () => {
  return (
    <UL className="square-group simple-list">
      <LI className="square-1 warning" />
      <LI className="square-1 primary" />
      <LI className="square-2 warning1" />
      <LI className="square-3 danger" />
      <LI className="square-4 light" />
      <LI className="square-5 warning" />
      <LI className="square-6 success" />
      <LI className="square-7 success" />
    </UL>
  );
};

export default SquareGroup;
