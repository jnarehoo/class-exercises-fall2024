import java.util.List;
import java.util.ArrayList;

public class ContainsPair {
    public static boolean containsPair(List<Integer> l) {
        List<Integer> unique = new ArrayList<Integer>();
        for (int i = 0; i < l.size(); i++) {
            if (unique.contains(l.get(i))) {
                return true;
            }
            unique.add(l.get(i));
        }
        return false;
    }

    public static void main(String[] args) {
        // used ChatGPT to figure out how to make an Int List
        List<Integer> list = new ArrayList<Integer>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(1); // https://sentry.io/answers/how-do-i-declare-and-initialize-an-array-in-java/
        System.out.println(containsPair(list));
    }
}







 