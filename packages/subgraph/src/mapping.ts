import { Token } from "../generated/schema";
import { TheHydra, Transfer } from "../generated/TheHydra/TheHydra";

export function handleTransfer(event: Transfer): void {
  const contract = TheHydra.bind(event.address);

  const token = new Token(event.params.id.toString());
  token.owner = event.params.to;
  token.tokenURI = contract.tokenURI(event.params.id);
  token.save();
}
