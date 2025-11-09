import { RelevantSectors } from "./RelevantSectors";
import { Company } from "./Company";

export interface Reason {
  text: string;
  category: string;
  magnitude: string;
  sharePriceImpact: number;
  newPrice: number;
  relevantSectors: RelevantSectors[];
  affectedCompany: Company
}