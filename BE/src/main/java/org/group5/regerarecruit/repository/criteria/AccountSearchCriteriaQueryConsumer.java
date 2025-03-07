package org.group5.regerarecruit.repository.criteria;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.group5.regerarecruit.entity.Account;

import java.util.function.Consumer;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountSearchCriteriaQueryConsumer implements Consumer<SearchCriteria> {
    private CriteriaBuilder builder;
    private Predicate predicate;
    private Root<Account> root;

    @Override
    public void accept(SearchCriteria param) {
        if (param.getOperation().equals(">")) {
            predicate = builder.and( predicate, builder.greaterThanOrEqualTo( root.get(param.getKey()), param.getValue().toString()));
        } else if (param.getOperation().equals("<")) {
            predicate = builder.and( predicate, builder.lessThanOrEqualTo( root.get(param.getKey()), param.getValue().toString()));
        } else {
            if (param.getValue().getClass() == String.class) {
                predicate = builder.and( predicate, builder.like(root.get(param.getKey()),"%" + param.getValue().toString() + "%"));
            } else {
                predicate = builder.and(predicate, builder.equal(root.get(param.getKey()), param.getValue()));
            }
        }
    }
}
