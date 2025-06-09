
declare namespace App {
  type Tag = {
    attributes: object;
    tag: String;
  };

  interface Locals {
    tags: Tag[];
  }
}
