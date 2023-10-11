 // Scala:
object PrintOptions {
   def main(args: Array[String]) {
     println("Выбраны опции:")
     for (arg <- args if arg startsWith "-") {
        println(" " + (arg substring 1))
     }
   }
 }