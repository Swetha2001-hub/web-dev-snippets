P = {
  "milk"   => { up: 3.97, sq: 2, sp: 5.00 },
  "bread"  => { up: 2.17, sq: 3, sp: 6.00 },
  "banana" => { up: 0.99, sq: nil, sp: nil},
  "apple"  => { up: 0.89, sq: nil, sp: nil}
}


def calculate_total_cost(datas)
  total_cost = 0
  item_count = Hash.new(0)
  
  datas.each do |item|

    item_count[item] = item_count[item] +1
  end

  
  item_count.each do |item, quantity|
    if P.key?(item)  
      up = P[item][:up]
      sq = P[item][:sq]
      sp= P[item][:sp]
    
      if sq &&  quantity >= sq 
        b = quantity / sq
        r= quantity % sq
        total_cost = total_cost + (b* sp) + (r * up)  
      else
        total_cost = total_cost +quantity * up 
      end
    else
      puts "NO ITEM."
    end
  end

  total_cost
end


puts "Enter the items "
input = gets.chomp
datas= input.split(",")

total = calculate_total_cost(datas)


puts "Total cost: #{total}"
