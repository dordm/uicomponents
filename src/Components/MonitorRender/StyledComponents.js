import styled from "styled-components";
import ArrowRight from "@material-ui/icons/ArrowForward";

export const DivChange = styled.div`
  padding-left: ${props => (props.width > 600 ? "55" : "24")}px;
  padding-right: 16px;
`;

export const StyledArrowRight = styled(ArrowRight)`
  font-size: 36px !important;
  padding-right: 10px;
  padding-left: 5px;
  fill: #a4afbf !important;
`;
