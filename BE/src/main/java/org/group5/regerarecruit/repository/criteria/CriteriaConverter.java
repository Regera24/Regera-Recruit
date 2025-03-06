package org.group5.regerarecruit.repository.criteria;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@NoArgsConstructor
@AllArgsConstructor
@Component
public class CriteriaConverter {
    public List<SearchCriteria> toCriteriaList(String... searchs){
        List<SearchCriteria> list = new ArrayList<>();

        if (searchs != null) {
            for (String s : searchs) {
                if (StringUtils.hasLength(s)) {
                    Pattern pattern = Pattern.compile("(\\w+?)([:><])(.*)");
                    Matcher matcher = pattern.matcher(s);
                    if (matcher.find()) {
                        list.add(new SearchCriteria(matcher.group(1), matcher.group(2), matcher.group(3)));
                    }
                }
            }
        }

        return list;
    }
}
