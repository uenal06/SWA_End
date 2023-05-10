package com.mustafa.fullstackbackend.repository;

import com.mustafa.fullstackbackend.model.Gruppe;
import com.mustafa.fullstackbackend.model.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserGroupRepository extends JpaRepository<UserGroup,Long> {
    List<UserGroup> findAllByUserIdAndGroupId(Long userId, Long groupId);
    @Query("SELECT u.username FROM User u JOIN UserGroup ug ON u.userId = ug.userId WHERE ug.groupId = :groupId")
    List<String> findUsernamesByGroupId(@Param("groupId") Long groupId);

    @Query("SELECT g FROM Gruppe g JOIN UserGroup ug ON g.groupId = ug.groupId WHERE ug.userId = :userId")
    List<Gruppe> findGroupNamesByUserId(@Param("userId") Long userId);
}
