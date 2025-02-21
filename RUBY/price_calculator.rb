class ShoppingCart
    P = {
      "milk"   => { up: 3.97, sq: 2, sp: 5.00 },
      "bread"  => { up: 2.17, sq: 3, sp: 6.00 },
      "banana" => { up: 0.99, sq: nil, sp: nil },
      "apple"  => { up: 0.89, sq: nil, sp: nil }
    }
  
    
    def initialize(items)
      @items = items
      @item_count = items.tally
      @total_cost = 0
      @total_savings = 0
    end
  
    def calculate_total_cost
      puts "\nItem       Quantity    Price"
      puts "------------------------------"
              
      @item_count.each do |item, quantity|
        if P.key?(item)
          up, sq, sp = P[item].values_at(:up, :sq, :sp)
  
          if sq && quantity >= sq
            bundles = quantity / sq
            remainder = quantity % sq
            regular_price = quantity * up
            discount_price = (bundles * sp) + (remainder * up)
            savings = regular_price - discount_price
            item_price = discount_price
            @total_savings += savings
          else
            item_price = quantity * up
          end
  
          @total_cost += item_price
          puts "#{item.capitalize.ljust(10)} #{quantity.to_s.ljust(10)} #{'%.2f' % item_price}"
        else
          puts "NO ITEM"
        end
        
      end
      puts "------------------------------"
      puts "\nTotal price : $#{'%.2f' % @total_cost}"
      puts "You saved $#{'%.2f' % @total_savings} today." if @total_savings > 0
    end
  end
  
  puts "Enter the items:"
  input = gets.chomp
  items = input.split(",").map(&:strip).map(&:downcase)  
  
  cart = ShoppingCart.new(items)
  cart.calculate_total_cost
  