package com.mustafa.fullstackbackend.repository;

import com.mustafa.fullstackbackend.model.Gruppe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupRepository extends JpaRepository<Gruppe,Long> {
    @Query("SELECT g.groupName FROM Gruppe g JOIN UserGroup ug ON g.groupId = ug.groupId WHERE ug.userId = :userId")
    List<String> findGroupNamesByUserId(@Param("userId") Long userId);

}
