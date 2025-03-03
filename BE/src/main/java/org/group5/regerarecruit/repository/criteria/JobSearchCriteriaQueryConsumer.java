package org.group5.regerarecruit.repository.criteria;

import java.util.Arrays;
import java.util.function.Consumer;

import jakarta.persistence.criteria.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.group5.regerarecruit.entity.City;
import org.group5.regerarecruit.entity.Job;
import org.group5.regerarecruit.entity.Tag;
import org.springframework.util.StringUtils;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobSearchCriteriaQueryConsumer implements Consumer<SearchCriteria> {
    private CriteriaBuilder builder;
    private Predicate predicate;
    private Root<Job> root;

    @Override
    public void accept(SearchCriteria param) {
        if(param.getKey().equals("tags") || param.getKey().equals("cities")){
            if(param.getKey().equals("tags") && param.getValue()!=null){
                Join<Job, Tag> tagJoin = root.join("tags", JoinType.INNER);
                Long[] values = Arrays.stream(((String) param.getValue()).split("-"))
                        .filter(s -> !s.isEmpty())
                        .map(Long::valueOf)
                        .toArray(Long[]::new);
                predicate = builder.and(predicate, tagJoin.get("id").in(values));
            }
            if(param.getKey().equals("cities") && param.getValue()!=null){
                Join<Job, City> tagJoin = root.join("cities", JoinType.INNER);
                Long[] values = Arrays.stream(((String) param.getValue()).split("-"))
                        .filter(s -> !s.isEmpty())
                        .map(Long::valueOf)
                        .toArray(Long[]::new);
                predicate = builder.and(predicate, tagJoin.get("id").in(values));
            }
        }else{
            if (param.getOperation().equals(">")) {
                predicate = builder.and(
                        predicate,
                        builder.greaterThanOrEqualTo(
                                root.get(param.getKey()), param.getValue().toString()));
            } else if (param.getOperation().equals("<")) {
                predicate = builder.and(
                        predicate,
                        builder.lessThanOrEqualTo(
                                root.get(param.getKey()), param.getValue().toString()));
            } else {
                if (param.getValue().getClass() == String.class) {
                    predicate = builder.and(
                            predicate,
                            builder.like(
                                    root.get(param.getKey()), "%" + param.getValue().toString() + "%"));
                } else {
                    predicate = builder.and(predicate, builder.equal(root.get(param.getKey()), param.getValue()));
                }
            }
        }
    }
}
