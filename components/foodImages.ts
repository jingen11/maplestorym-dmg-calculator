// Static imports so the food icons in assets/food/ get bundled by the
// static export; keyed by the imagePath values in lib/data/food.json.

import type { StaticImageData } from "next/image";

import BabyChickCookie from "@/assets/food/BabyChickCookie.jpg";
import BossRushBoostPotion from "@/assets/food/BossRushBoostPotion.jpg";
import BuckwheatJelly from "@/assets/food/BuckwheatJelly.jpg";
import ButteryRoastedSquid from "@/assets/food/ButteryRoastedSquid.jpg";
import CandyBasket from "@/assets/food/CandyBasket.jpg";
import CandyCane from "@/assets/food/CandyCane.jpg";
import CarrotJuice from "@/assets/food/CarrotJuice.jpg";
import Chestnut from "@/assets/food/Chestnut.jpg";
import ColdJellyfishSalad from "@/assets/food/ColdJellyfishSalad.jpg";
import Escargot from "@/assets/food/Escargot.jpg";
import FriedShrimp from "@/assets/food/FriedShrimp.jpg";
import FruityYogurt from "@/assets/food/FruityYogurt.jpg";
import GrapeJuice from "@/assets/food/GrapeJuice.jpg";
import NoodleSoupWithMushroom from "@/assets/food/NoodleSoupWithMushroom.jpg";
import PumpkinPieces from "@/assets/food/PumpkinPieces.jpg";
import PureWater from "@/assets/food/PureWater.jpg";
import RiceCakeSoup from "@/assets/food/RiceCakeSoup.jpg";
import StirFriedPork from "@/assets/food/Stir-FriedPork.jpg";
import VerySpecialSundae from "@/assets/food/VerySpecialSundae.jpg";

export const FOOD_IMAGES: Record<string, StaticImageData> = {
  BabyChickCookie,
  BossRushBoostPotion,
  BuckwheatJelly,
  ButteryRoastedSquid,
  CandyBasket,
  CandyCane,
  CarrotJuice,
  Chestnut,
  ColdJellyfishSalad,
  Escargot,
  FriedShrimp,
  FruityYogurt,
  GrapeJuice,
  NoodleSoupWithMushroom,
  PumpkinPieces,
  PureWater,
  RiceCakeSoup,
  "Stir-FriedPork": StirFriedPork,
  VerySpecialSundae,
};
